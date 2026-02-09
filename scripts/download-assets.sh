#!/bin/bash
set -e

BASE="https://realfood.gov"
PUBLIC="$(dirname "$0")/../public"

mkdir -p "$PUBLIC/fonts" "$PUBLIC/images/pyramid" "$PUBLIC/images/covers" "$PUBLIC/images/broken-system" "$PUBLIC/video" "$PUBLIC/seo"

echo "==> Downloading font..."
curl -sL "$BASE/_next/static/media/93f479601ee12b01-s.p.woff2" -o "$PUBLIC/fonts/DieGrotesk.woff2"

echo "==> Downloading pyramid images..."
PYRAMID_IMAGES=(
  milk olive-oil salmon chicken canned-tuna avocado cheese yogurt
  steak ground-beef bowl-rice-beans shrimp butter walnut-shelled
  walnut-kernel almond peanuts eggs broccoli lettuce blueberry
  strawberry-right blueberries strawberry tomatoes frozen-peas
  bananas carrots green-beans butternut apples cut-apple oranges
  potato grapes bread bowl-oats oats rice
)
for img in "${PYRAMID_IMAGES[@]}"; do
  echo "  pyramid/$img.webp"
  curl -sL "$BASE/images/pyramid/$img.webp" -o "$PUBLIC/images/pyramid/$img.webp" || echo "  WARN: $img.webp failed"
done

echo "==> Downloading cover images..."
for i in 1 2 3 4; do
  curl -sL "$BASE/images/covers/$i.webp" -o "$PUBLIC/images/covers/$i.webp"
done

echo "==> Downloading broken-system image..."
curl -sL "$BASE/images/broken-system/food-pyramid.webp" -o "$PUBLIC/images/broken-system/food-pyramid.webp"

echo "==> Downloading video placeholder..."
curl -sL "$BASE/images/video-placeholder.webp" -o "$PUBLIC/images/video-placeholder.webp"

echo "==> Downloading videos..."
curl -sL "$BASE/video/bgv.mp4" -o "$PUBLIC/video/bgv.mp4" || echo "  WARN: bgv.mp4 not available"
curl -sL "$BASE/video/Real_Food_by_Mike_Tyson.mp4" -o "$PUBLIC/video/Real_Food_by_Mike_Tyson.mp4" || echo "  WARN: video not available"

echo "==> Downloading favicons..."
curl -sL "$BASE/favicon.ico" -o "$PUBLIC/favicon.ico"
curl -sL "$BASE/favicon-16x16.png" -o "$PUBLIC/favicon-16x16.png" || true
curl -sL "$BASE/favicon-32x32.png" -o "$PUBLIC/favicon-32x32.png" || true
curl -sL "$BASE/apple-touch-icon.png" -o "$PUBLIC/apple-touch-icon.png" || true

echo "==> Downloading OG image..."
curl -sL "$BASE/seo/opengraph-image-1200x630.png" -o "$PUBLIC/seo/opengraph-image-1200x630.png"

echo "==> Done! All assets downloaded to $PUBLIC"
