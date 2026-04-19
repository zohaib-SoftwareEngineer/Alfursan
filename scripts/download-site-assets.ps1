# Re-download binary assets used by this clone (icons, fonts, floor thumbnails).
# Run from repo root: powershell -ExecutionPolicy Bypass -File scripts/download-site-assets.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path "$root/package.json")) { $root = (Get-Location).Path }

$dirs = @(
  "$root/public/assets/icons",
  "$root/public/assets/fonts/altone",
  "$root/public/assets/fonts/poppins",
  "$root/public/assets/thumbnails",
  "$root/public/assets/video"
)
foreach ($d in $dirs) { New-Item -ItemType Directory -Force -Path $d | Out-Null }

$downloads = @(
  @{ Path = "$root/public/assets/icons/header_pattern.svg"; Url = "https://safaalfursan.sa/icons/header_pattern.svg" },
  @{ Path = "$root/public/assets/icons/compas_Icon_01.svg"; Url = "https://safaalfursan.sa/icons/compas_Icon_01.svg" },
  @{ Path = "$root/public/favicon.svg"; Url = "https://safaalfursan.sa/static/favicon.svg" },
  @{ Path = "$root/public/assets/fonts/altone/Altone-Light.ttf"; Url = "https://safaalfursan.sa/fonts/altone/Altone-Light.ttf" },
  @{ Path = "$root/public/assets/fonts/altone/Altone-Regular.ttf"; Url = "https://safaalfursan.sa/fonts/altone/Altone-Regular.ttf" },
  @{ Path = "$root/public/assets/fonts/altone/Altone-Medium.ttf"; Url = "https://safaalfursan.sa/fonts/altone/Altone-Medium.ttf" },
  @{ Path = "$root/public/assets/fonts/altone/Altone-Bold.ttf"; Url = "https://safaalfursan.sa/fonts/altone/Altone-Bold.ttf" }
)

foreach ($t in @('A_F', 'B_F', 'C_F', 'D_F', 'E_F')) {
  $downloads += @{
    Path = "$root/public/assets/thumbnails/$t.jpg"
    Url  = "https://data.prographers.com/VinodeSafaAlfursan23/Thumbnails/ApartmentCards/$t.jpg"
  }
}

$poppins = @(
  @{ Name = 'Poppins-Light.ttf'; Url = 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLDz8V1s.ttf' },
  @{ Name = 'Poppins-Regular.ttf'; Url = 'https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrFJA.ttf' },
  @{ Name = 'Poppins-Medium.ttf'; Url = 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLGT9V1s.ttf' },
  @{ Name = 'Poppins-SemiBold.ttf'; Url = 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6V1s.ttf' },
  @{ Name = 'Poppins-Bold.ttf'; Url = 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7V1s.ttf' }
)
foreach ($p in $poppins) {
  $downloads += @{ Path = "$root/public/assets/fonts/poppins/$($p.Name)"; Url = $p.Url }
}

foreach ($d in $downloads) {
  Write-Host "GET $($d.Url)"
  curl.exe -fsSL -o $d.Path $d.Url
}

Write-Host "Done. Optional: unit walkthrough MP4 may only play from CDN when opened from safaalfursan (hotlink protection)."
