# Noesis Icon & Asset Generation Guide

## SVG Source Files Created
1. **noesis-logo.svg** - Detailed 8-pointed star logo
2. **noesis-icon-simple.svg** - Simplified sparkle icon (recommended for app)
3. **noesis-splash.svg** - Splash screen with logo and text

## Required PNG Assets for Expo

### App Icon (icon.png)
- Size: **1024x1024**
- Source: `noesis-icon-simple.svg`
- Location: `assets/images/icon.png`

### Adaptive Icon (Android)
- Size: **1024x1024**
- Source: `noesis-icon-simple.svg`
- Location: `assets/images/adaptive-icon.png`
- Note: Use same file as icon.png

### Splash Screen
- Size: **1284x2778** (iPhone 14 Pro Max)
- Source: `noesis-splash.svg`
- Location: `assets/images/splash-icon.png`

### Favicon (Web)
- Size: **48x48** or **32x32**
- Source: `noesis-icon-simple.svg`
- Location: `assets/images/favicon.png`

## Option 1: Online SVG to PNG Conversion

Use any of these online tools:
1. **CloudConvert** (https://cloudconvert.com/svg-to-png)
   - Upload SVG
   - Set dimensions
   - Download PNG

2. **SVG2PNG** (https://svgtopng.com/)
   - Simple drag and drop
   - Specify output size

3. **Figma** (https://figma.com)
   - Import SVG
   - Export as PNG at desired size

## Option 2: Command Line (If you have ImageMagick or Inkscape)

### Using Inkscape (Recommended for quality)
```bash
# Icon
inkscape noesis-icon-simple.svg -w 1024 -h 1024 -o ../images/icon.png

# Adaptive Icon
inkscape noesis-icon-simple.svg -w 1024 -h 1024 -o ../images/adaptive-icon.png

# Splash
inkscape noesis-splash.svg -w 1284 -h 2778 -o ../images/splash-icon.png

# Favicon
inkscape noesis-icon-simple.svg -w 48 -h 48 -o ../images/favicon.png
```

### Using ImageMagick
```bash
# Icon
magick convert -background none -density 300 noesis-icon-simple.svg -resize 1024x1024 ../images/icon.png

# Splash
magick convert -background none -density 300 noesis-splash.svg -resize 1284x2778 ../images/splash-icon.png
```

## Option 3: Use Expo's Asset Resizing

Expo can resize images for you if you provide high-resolution source:
1. Create 1024x1024 PNG for icon
2. Create splash at native resolution
3. Expo handles the rest via app.json configuration

## Current Status

✅ SVG source files created
⚠️ PNG files need to be generated from SVGs
⏳ Place generated PNGs in `assets/images/` folder

## After Generating PNGs

1. Replace the files in `assets/images/`:
   - icon.png
   - adaptive-icon.png
   - splash-icon.png
   - favicon.png

2. Test the app:
   ```bash
   npm start
   ```

3. The new icons should appear when you:
   - Install the app on device
   - View the splash screen on launch
   - See the app in launcher/home screen

## Design Notes

- **Icon**: Four-pointed sparkle/star on warm gradient
- **Colors**: Golden (#E6B17E) to Terra Cotta (#D4725C)
- **Style**: Clean, modern, slightly mystical
- **Works well**: At all sizes from 16x16 to 1024x1024
- **Safe area**: Logo centered with 15% margin on all sides
