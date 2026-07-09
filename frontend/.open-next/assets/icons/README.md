# PWA Icons Required

This directory needs 8 icon sizes for the Progressive Web App to work properly.

## Required Icon Sizes:
- icon-72x72.png (72x72)
- icon-96x96.png (96x96)
- icon-128x128.png (128x128)
- icon-144x144.png (144x144)
- icon-152x152.png (152x152)
- icon-192x192.png (192x192)
- icon-384x384.png (384x384)
- icon-512x512.png (512x512)

## Design Requirements:
- **Format**: PNG with transparency
- **Purpose**: Maskable (safe area design)
- **Safe Area**: Keep important content within 80% center circle
- **Background**: Can use transparent or brand color (#D97757 - terracotta)
- **Content**: Wookporium logo or "W" monogram
- **Style**: Should match Desert Dust brand aesthetic

## Tools to Generate:
- PWA Asset Generator: https://github.com/elegantapp/pwa-asset-generator
- Favicon Generator: https://realfavicongenerator.net/
- Manual: Use Figma/Photoshop with icon template

## Temporary Placeholder:
Until brand icons are ready, you can:
1. Generate simple text-based icons with the "W" letter
2. Use a solid terracotta background (#D97757)
3. White text for the "W"

## Testing:
After adding icons, verify:
- Lighthouse PWA score shows icons are valid
- iOS Add to Home Screen shows correct icon
- Android Add to Home Screen shows correct icon
- All sizes load without 404 errors
