# Builds assets/tailwind.css from the Tailwind classes used in index.html and assets/site.js.
# It runs the pinned Tailwind 3.4.17 browser build inside headless Microsoft Edge, so no Node.js is needed.
# Run it after adding or changing Tailwind classes. publish.ps1 runs it automatically.

Set-Location $PSScriptRoot
$ErrorActionPreference = 'Stop'

$edge = @(
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
) | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1
if (-not $edge) { Write-Error 'Microsoft Edge or Google Chrome is required to build the CSS.'; exit 1 }

$utf8 = New-Object System.Text.UTF8Encoding($false)
$html = [System.IO.File]::ReadAllText((Join-Path $PSScriptRoot 'index.html'), $utf8)
$js = [System.IO.File]::ReadAllText((Join-Path $PSScriptRoot 'assets\site.js'), $utf8)
$config = [System.IO.File]::ReadAllText((Join-Path $PSScriptRoot 'assets\tailwind.config.js'), $utf8)

# 1. Collect candidate class names: every class="..." in the page, plus every string literal in the script
$tokens = New-Object 'System.Collections.Generic.HashSet[string]'
foreach ($m in [regex]::Matches($html, 'class\s*=\s*"([^"]*)"')) {
    foreach ($tk in ($m.Groups[1].Value -split '\s+')) { if ($tk) { [void]$tokens.Add($tk) } }
}
foreach ($m in [regex]::Matches($js, '''([^''\r\n]*)''|"([^"\r\n]*)"|`([^`]*)`')) {
    $value = $m.Groups[1].Value + $m.Groups[2].Value + $m.Groups[3].Value
    foreach ($tk in ($value -split '[\s"]+')) { if ($tk -and $tk.Length -lt 120) { [void]$tokens.Add($tk) } }
}
$classAttr = [System.Net.WebUtility]::HtmlEncode(($tokens -join ' '))

# 2. Generator page: Tailwind runtime + our config + one element carrying every class
$work = Join-Path $env:TEMP ('tw-build-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $work | Out-Null
$page = @"
<!doctype html><html class="dark"><head><meta charset="utf-8">
<script src="https://cdn.tailwindcss.com/3.4.17"></script>
<script>$config</script>
</head><body><div class="$classAttr"></div></body></html>
"@
[System.IO.File]::WriteAllText((Join-Path $work 'build.html'), $page, $utf8)

# 3. Let Edge render it and dump the DOM, which now contains the generated <style>
$out = Join-Path $work 'dom.html'
$edgeArgs = @('--headless=new', '--disable-gpu', "--user-data-dir=$work\profile", '--virtual-time-budget=15000', '--dump-dom', ('file:///' + ($work -replace '\\', '/') + '/build.html'))
$proc = Start-Process -FilePath $edge -ArgumentList $edgeArgs -RedirectStandardOutput $out -RedirectStandardError (Join-Path $work 'err.txt') -PassThru -WindowStyle Hidden
$timedOut = -not $proc.WaitForExit(90000)

# Edge helper processes can keep the output file open for a moment, so read it with shared access
function Read-Shared($path) {
    $fs = New-Object System.IO.FileStream($path, 'Open', 'Read', 'ReadWrite, Delete')
    try { (New-Object System.IO.StreamReader($fs, $utf8)).ReadToEnd() } finally { $fs.Dispose() }
}
$dom = ''
for ($i = 0; $i -lt 60 -and $dom -notmatch '</html>'; $i++) {
    if (Test-Path $out) { $dom = Read-Shared $out }
    if ($dom -notmatch '</html>') { Start-Sleep -Milliseconds 500 }
}

# Close any Edge processes this build started, then clean up
Get-CimInstance Win32_Process -Filter "Name='msedge.exe' OR Name='chrome.exe'" |
    Where-Object { $_.CommandLine -like "*$work*" } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Milliseconds 300
Remove-Item -Recurse -Force $work -ErrorAction SilentlyContinue
if ($timedOut -and $dom -notmatch '</html>') { Write-Error 'Edge timed out while building the CSS.'; exit 1 }

$style = [regex]::Matches($dom, '<style[^>]*>([\s\S]*?)</style>') | Where-Object { $_.Groups[1].Value -match 'tailwindcss v3' } | Select-Object -First 1
if (-not $style) { Write-Error 'Tailwind did not produce any CSS (is the internet connection working?).'; exit 1 }

# 4. Light minification: drop comments (keep the licence line) and collapse whitespace
$css = $style.Groups[1].Value
$licence = ([regex]::Match($css, '/\*\s*!\s*tailwindcss[^*]*\*/')).Value
$css = [regex]::Replace($css, '/\*[\s\S]*?\*/', '')
$css = [regex]::Replace($css, '\s+', ' ')
$css = [regex]::Replace($css, '\s*([{};,>])\s*', '$1')
$css = ($licence + "`n" + $css.Trim() + "`n")

# 5. Write only when something changed (keeps auto-publish from looping)
$target = Join-Path $PSScriptRoot 'assets\tailwind.css'
$old = if (Test-Path $target) { [System.IO.File]::ReadAllText($target, $utf8) } else { '' }
if ($old -ne $css) {
    [System.IO.File]::WriteAllText($target, $css, $utf8)
    Write-Host ("assets/tailwind.css updated ({0:N1} KB)." -f ($css.Length / 1KB))
} else {
    Write-Host 'assets/tailwind.css is already up to date.'
}
