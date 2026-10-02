param(
    [string]$Message = "Update website"
)

Set-Location $PSScriptRoot

$branch = (git branch --show-current).Trim()
if (-not $branch) {
    Write-Error "This folder is not on a Git branch."
    exit 1
}

$stagedChanges = git diff --cached --name-only
if ($stagedChanges) {
    Write-Error "There are already staged changes. Commit or unstage them before publishing."
    exit 1
}

$sitePaths = @(
    'admin.html',
    'google1093e83ae0034777.html',
    'index.html',
    'public/',
    'robots.txt',
    'saadman_khandker.html',
    'sitemap.xml'
)
git add -- $sitePaths
if ($LASTEXITCODE -ne 0) {
    Write-Error "Could not stage website files."
    exit $LASTEXITCODE
}

git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "No website changes to publish."
    exit 0
}

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

if ($branch -eq 'master') {
    git push origin master:main
    if ($LASTEXITCODE -ne 0) {
        Write-Error "The master branch was pushed, but syncing main failed."
        exit $LASTEXITCODE
    }
}

Write-Host "Website published from branch '$branch'."