param(
    [string]$Message = "Update website"
)

Set-Location $PSScriptRoot

$branch = (git branch --show-current).Trim()
if (-not $branch) {
    Write-Error "This folder is not on a Git branch."
    exit 1
}

git add .
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
    Write-Error "Commit failed. Check the message above."
    exit $LASTEXITCODE
}

git push origin $branch
if ($LASTEXITCODE -ne 0) {
    Write-Error "Push failed. Sign in to GitHub, then run this script again."
    exit $LASTEXITCODE
}

Write-Host "Website published from branch '$branch'."