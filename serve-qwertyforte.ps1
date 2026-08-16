# ==============================================================================
# QwertyForte Zero-Dependency Local Dev Server & Packaging CLI (Windows)
# ==============================================================================

param (
    [int]$Port = 8080,
    [switch]$BuildOnly = $false,
    [string]$AppName = "FocusedApp",
    [string]$VersionName = "Production",
    [string]$VersionNumber = "v1.0.0"
)

$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$WebRoot = Join-Path $PSScriptRoot "tools\qwertyforte"
$DistRoot = Join-Path $PSScriptRoot "dist\builds"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  QWERTYFORTE - Universal Build Matrix & Developer Server   " -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# Ensure dist/builds directories exist
if (-not (Test-Path $DistRoot)) {
    New-Item -ItemType Directory -Path $DistRoot -Force | Out-Null
}

if ($BuildOnly) {
    Write-Host "[CLI] Headless Package Build mode selected." -ForegroundColor Yellow
    Write-Host "[CLI] Scaffolding active target directories..." -ForegroundColor Green

    $configPath = Join-Path $WebRoot "qwertyforte.config.json"
    if (Test-Path $configPath) {
        $config = Get-Content $configPath -Raw | ConvertFrom-Json
        foreach ($target in $config.activeOSTargets) {
            $brandSlug = $target.brandId -replace "_", ""
            $targetDir = Join-Path $DistRoot "$($target.brandId)\$($target.versionId)\$($target.arch)"
            if (-not (Test-Path $targetDir)) {
                New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
            }
            $pkgName = "${AppName}_${VersionName}_${VersionNumber}_$($target.brandId)_$($target.versionId)_$($target.arch)$($target.format)"
            $pkgPath = Join-Path $targetDir $pkgName
            $manifest = @{
                appName = $AppName
                versionName = $VersionName
                versionNumber = $VersionNumber
                targetPlatform = $target.brandId
                targetOSVersion = $target.versionId
                targetArch = $target.arch
                packageFormat = $target.format
                generatedAt = (Get-Date).ToString("o")
            } | ConvertTo-Json
            Set-Content -Path $pkgPath -Value $manifest -Encoding UTF8
            Write-Host "  [OK] Generated: $pkgPath" -ForegroundColor Gray
        }
    }
    Write-Host "[CLI] All packages scaffolded successfully." -ForegroundColor Green
    Exit 0
}

# Start HTTP Listener
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "[Server] QwertyForte Control Panel is LIVE at: $prefix" -ForegroundColor Green
    Write-Host "[Server] Press Ctrl+C in this terminal to stop the server." -ForegroundColor Gray
    
    # Try to open the default browser automatically
    Start-Process $prefix -ErrorAction SilentlyContinue

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($localPath) -or $localPath -eq '/') {
            $localPath = "index.html"
        }

        $filePath = Join-Path $WebRoot $localPath

        if (Test-Path $filePath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($extension) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".png"  { "image/png" }
                ".svg"  { "image/svg+xml" }
                default { "application/octet-stream" }
            }

            $response.ContentType = $contentType
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} catch {
    Write-Host "[Server] Stopped or interrupted: $($_.Exception.Message)" -ForegroundColor Yellow
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
}
