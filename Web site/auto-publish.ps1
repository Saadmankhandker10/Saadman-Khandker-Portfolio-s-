Set-Location $PSScriptRoot

$watcher = New-Object IO.FileSystemWatcher
$watcher.Path = $PSScriptRoot
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$action = {
    $changedPath = $Event.SourceEventArgs.FullPath
    if ($changedPath -match '\\.git\\' -or $changedPath -match '\\(auto-publish|publish)\.ps1$') {
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