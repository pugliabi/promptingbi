# Downloads the original site images from the Wayback Machine into public/images/
# Run once from the repo root before your first commit:
#   powershell -ExecutionPolicy Bypass -File .\download-images.ps1
$map = @{
  "public/images/2024/09/image.png"                 = "https://web.archive.org/web/20240913112913id_/https://promptingbi.com/wp-content/uploads/2024/09/image.png"
  "public/images/2024/09/image-1.png"               = "https://web.archive.org/web/20240911224224id_/https://promptingbi.com/wp-content/uploads/2024/09/image-1.png"
  "public/images/2024/09/image-3.png"               = "https://web.archive.org/web/20240911211201id_/https://promptingbi.com/wp-content/uploads/2024/09/image-3.png"
  "public/images/2024/09/image-4.png"               = "https://web.archive.org/web/20241117101150id_/https://promptingbi.com/wp-content/uploads/2024/09/image-4.png"
  "public/images/2024/09/image-5.png"               = "https://web.archive.org/web/20240912120431id_/https://promptingbi.com/wp-content/uploads/2024/09/image-5.png"
  "public/images/2024/09/2024-09-11_14-44-47.png"   = "https://web.archive.org/web/20240911212606id_/https://promptingbi.com/wp-content/uploads/2024/09/2024-09-11_14-44-47.png"
  "public/images/2024/05/Icon-1-e1716581578686.jpg" = "https://web.archive.org/web/20240718011706id_/https://promptingbi.com/wp-content/uploads/2024/05/Icon-1-e1716581578686.jpg"
  "public/images/2024/05/Icon-1-1024x1024.jpg"      = "https://web.archive.org/web/20240718015952id_/https://promptingbi.com/wp-content/uploads/2024/05/Icon-1-1024x1024.jpg"
}
foreach ($f in $map.GetEnumerator()) {
  $dir = Split-Path $f.Key
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  Write-Host "Downloading $($f.Key)..."
  try {
    Invoke-WebRequest -Uri $f.Value -OutFile $f.Key -UserAgent "Mozilla/5.0"
    Start-Sleep -Seconds 2   # be polite to archive.org
  } catch { Write-Warning "Failed: $($f.Key) - $_" }
}
Write-Host "Done. Expect 8 files under public/images/."
