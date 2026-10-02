Set-Location $PSScriptRoot

$siteRoot = [System.IO.Path]::GetFullPath($PSScriptRoot)
$siteFilesPattern = '^(admin\.html|google1093e83ae0034777\.html|index\.html|robots\.txt|saadman_khandker\.html|sitemap\.xml|public[\\/].+)$'

$watcher = New-Object IO.FileSystemWatcher
$watcher.Path = $siteRoot
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$action = {
    $changedPath = $Event.SourceEventArgs.FullPath
    $relativePath = $changedPath.Substring($siteRoot.Length).TrimStart('\', '/')
    if ($relativePath -notmatch $siteFilesPattern) {
        return
    }

    Start-Sleep -Seconds 2
    & "$PSScriptRoot\publish.ps1" -Message "Auto-update website"
}

Register-ObjectEvent $watcher Changed -Action $action | Out-Null
Register-ObjectEvent $watcher Created -Action $action | Out-Null
Register-ObjectEvent $watcher Deleted -Action $action | Out-Null
Register-ObjectEvent $watcher Renamed -Action $action | Out-Null

Write-Host "Auto-publish is running. Save a website file to publish it. Press Ctrl+C to stop."
while ($true) {
    Wait-Event -Timeout 5 | Out-Null
}