# Extension Icons

Place your extension icons in this directory with the following sizes:

- `icon-16.png` - 16x16 pixels (toolbar icon, small)
- `icon-32.png` - 32x32 pixels (toolbar icon, medium)
- `icon-48.png` - 48x48 pixels (extension management page)
- `icon-128.png` - 128x128 pixels (Chrome Web Store, installation)

## Design Guidelines

### Style

- Clean, modern design
- Use Facebook blue (#1877F2) as primary color
- Include a visual representation of "clarity" or "filtering"
- Ensure icon is recognizable at all sizes

### Technical Requirements

- PNG format with transparency
- Optimized file size (use tools like TinyPNG)
- Clear at all sizes (test at each resolution)
- Consistent style across all sizes

### Recommended Tools

- [Figma](https://www.figma.com/) - Design
- [TinyPNG](https://tinypng.com/) - Optimization
- [Favicon Generator](https://favicon.io/) - Generate multiple sizes

## Temporary Icons

For development, you can use placeholder icons:

```bash
# Install ImageMagick (optional)
# brew install imagemagick  # macOS
# sudo apt-get install imagemagick  # Ubuntu

# Generate placeholder icons (requires ImageMagick)
convert -size 16x16 xc:blue icon-16.png
convert -size 32x32 xc:blue icon-32.png
convert -size 48x48 xc:blue icon-48.png
convert -size 128x128 xc:blue icon-128.png
```

Or download free icons from:

- [Flaticon](https://www.flaticon.com/)
- [Icons8](https://icons8.com/)
- [Noun Project](https://thenounproject.com/)

Make sure to check license requirements for any icons you use.
