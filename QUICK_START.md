# 🚀 Quick Start Guide

Get Clarity for Facebook up and running in 5 minutes!

## For Users

### Installation

1. **Download** the extension from the [Chrome Web Store](https://chrome.google.com/webstore) or [Firefox Add-ons](https://addons.mozilla.org/)
2. **Click** the extension icon in your browser toolbar
3. **Enable** "Clean Mode" toggle
4. **Visit** Facebook and enjoy a cleaner feed! ✨

That's it! Your Facebook feed is now clean.

## For Developers

### Setup (3 minutes)

```bash
# 1. Clone and install
git clone https://github.com/swe-tranquang/clarity-for-facebook.git
cd clarity-for-facebook
npm install

# 2. Start development
npm run dev

# 3. Load in browser
# Chrome: chrome://extensions/ → Load unpacked → select dist/chrome
# Firefox: about:debugging → Load Temporary Add-on → select manifest.json from dist/firefox
```

### Making Changes

```bash
# 1. Edit files in src/
# 2. Webpack auto-rebuilds
# 3. Reload extension in browser
# 4. Refresh Facebook page
```

### Building for Production

```bash
# Build for all browsers
npm run build:all

# Create distribution packages
cd dist/chrome && zip -r ../chrome.zip . && cd ../..
cd dist/firefox && zip -r ../firefox.xpi . && cd ../..
cd dist/edge && zip -r ../edge.zip . && cd ../..
```

## Common Tasks

### Adding a New Filter

1. **Define Type** in `src/types/index.ts`

```typescript
export type FeatureKey = 'myNewFeature' | /* existing */;
```

2. **Add Constant** in `src/constants/index.ts`

```typescript
{
  key: 'myNewFeature',
  label: 'My New Feature',
  icon: '🎯',
  description: 'Description here',
  enabled: true,
}
```

3. **Implement Logic** in `src/content/contentScript.ts`

```typescript
if (this.settings.myNewFeature && this.isMyNewFeature(element)) {
  hideElement(htmlElement);
}
```

### Debugging

```javascript
// Content Script (Facebook page console)
console.log('Debug:', data);

// Popup (Right-click icon → Inspect popup)
console.log('Popup state:', state);

// Background (chrome://extensions/ → service worker)
console.log('Background event:', event);
```

### Testing

```bash
# Type check
npm run type-check

# Lint code
npm run lint

# Fix lint errors
npm run lint:fix
```

## Project Structure

```
src/
├── background/       # Background service worker
├── content/         # Content scripts (Facebook page)
├── popup/           # React UI components
│   └── components/  # UI components
├── types/           # TypeScript definitions
├── constants/       # Configuration
└── utils/           # Helper functions

manifests/           # Browser-specific manifests
dist/               # Build output (generated)
```

## Key Files

- `src/content/contentScript.ts` - Main filtering logic
- `src/popup/components/Popup.tsx` - UI main component
- `src/utils/storage.ts` - Settings management
- `src/constants/index.ts` - Configuration
- `webpack.config.js` - Build configuration

## Useful Commands

```bash
npm run dev              # Development mode (watch)
npm run build           # Build for production
npm run build:all       # Build for all browsers
npm run type-check      # TypeScript checking
npm run lint            # Check code style
npm run lint:fix        # Fix code style
npm run clean           # Clean dist folder
```

## Browser-Specific Notes

### Chrome/Edge

- Uses Service Worker for background script
- Supports sync storage by default
- Fast review process (~1-2 days)

### Firefox

- Uses traditional background script
- Requires `browser_specific_settings` in manifest
- Longer review process (~1-2 weeks)

## Performance Tips

1. **Throttle observer** - Already implemented (300ms)
2. **Batch processing** - Process max 50 elements at once
3. **Smart selectors** - Use specific CSS selectors
4. **Debounce actions** - Wait 500ms before processing

## Troubleshooting

### Extension Not Working

- ✅ Check "Clean Mode" is enabled
- ✅ Reload Facebook page
- ✅ Check browser console for errors

### Content Not Filtered

- ✅ Facebook may have updated their DOM
- ✅ Update selectors in `src/constants/index.ts`
- ✅ Open an issue on GitHub

### Build Errors

- ✅ Delete `node_modules` and `dist`
- ✅ Run `npm install` again
- ✅ Check Node.js version (16+)

## Resources

- 📖 [Full Documentation](README.md)
- 👨‍💻 [Development Guide](DEVELOPMENT.md)
- 🐛 [Report Issues](https://github.com/swe-tranquang/clarity-for-facebook/issues)
- 💬 [Discussions](https://github.com/swe-tranquang/clarity-for-facebook/discussions)

## Next Steps

1. ⭐ Star the repository
2. 🔧 Explore the codebase
3. 🎯 Try adding a new feature
4. 🤝 Submit a pull request

---

Need help? Open an issue or email dev@swe-tranquang.com

Happy coding! 🚀
