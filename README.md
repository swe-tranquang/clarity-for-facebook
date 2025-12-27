# 🌟 Clarity for Facebook

> Clean up your Facebook feed by removing unwanted content like Reels, sponsored posts, and suggestions.

A powerful, cross-platform browser extension that gives you control over what you see on Facebook. Built with TypeScript, React, and Tailwind CSS.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://reactjs.org/)

## ✨ Features

- **🎬 Remove Reels** - Hide all Reels from your feed
- **💰 Remove Sponsored Posts** - Block all sponsored and promoted content
- **👥 Remove Suggested Posts** - Hide "Suggested for you" posts
- **🏪 Remove Marketplace Ads** - Filter out Marketplace advertisements
- **🔍 Remove Search Ads** - Clean sponsored results in search
- **➕ Remove Follow Suggestions** - Hide "Follow" button suggestions
- **👤 Remove People You May Know** - Filter friend suggestions
- **✅ Clean Mode** - Master toggle to enable/disable all features at once

## 🚀 Installation

### For Users

#### Chrome/Edge

1. Download the latest release from [Releases](https://github.com/swe-tranquang/clarity-for-facebook/releases)
2. Unzip the downloaded file
3. Open Chrome/Edge and go to `chrome://extensions/` or `edge://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the unzipped folder
6. The extension icon should appear in your toolbar

#### Firefox

1. Download the `.xpi` file from [Releases](https://github.com/swe-tranquang/clarity-for-facebook/releases)
2. Open Firefox and go to `about:addons`
3. Click the gear icon and select "Install Add-on From File"
4. Select the downloaded `.xpi` file
5. Click "Add" when prompted

### For Developers

See [Development Guide](#-development) below.

## 📖 Usage

1. Click the extension icon in your browser toolbar
2. Toggle "Clean Mode" to activate the extension
3. Customize which content types you want to filter
4. Your settings are automatically saved and synced across devices
5. Visit Facebook and enjoy a cleaner feed!

### Export/Import Settings

- **Export**: Click the 📤 Export button to save your settings as a JSON file
- **Import**: Click the 📥 Import button to load settings from a JSON file
- **Reset**: Click the 🔄 Reset button to restore default settings

## 🛠️ Development

### Prerequisites

- Node.js 16+ and npm
- TypeScript 5.3+
- A modern browser (Chrome/Edge/Firefox)

### Setup

```bash
# Clone the repository
git clone https://github.com/swe-tranquang/clarity-for-facebook.git
cd clarity-for-facebook

# Install dependencies
npm install

# Start development mode (with hot reload)
npm run dev
```

### Project Structure

```
clarity-for-facebook/
├── src/
│   ├── background/           # Background service worker
│   │   └── background.ts
│   ├── content/             # Content scripts (DOM manipulation)
│   │   └── contentScript.ts
│   ├── popup/               # React popup UI
│   │   ├── components/
│   │   │   ├── Popup.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── FeatureToggle.tsx
│   │   ├── index.tsx
│   │   ├── popup.html
│   │   └── styles.css
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── constants/           # Constants and configuration
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── storage.ts
│   │   └── helpers.ts
│   └── icons/               # Extension icons
├── manifests/               # Browser-specific manifests
│   ├── manifest.chrome.json
│   ├── manifest.firefox.json
│   └── manifest.edge.json
├── dist/                    # Build output (generated)
├── webpack.config.js        # Webpack configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json
```

### Available Scripts

```bash
# Development
npm run dev                 # Build and watch for changes

# Production Build
npm run build              # Build for current browser
npm run build:chrome       # Build for Chrome
npm run build:firefox      # Build for Firefox
npm run build:edge         # Build for Edge
npm run build:all          # Build for all browsers

# Code Quality
npm run type-check         # Run TypeScript type checking
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint errors

# Utilities
npm run clean              # Clean dist folder
```

### Development Workflow

1. **Start Development Mode**

   ```bash
   npm run dev
   ```

2. **Load Extension in Browser**

   - Chrome: Go to `chrome://extensions/`, enable "Developer mode", click "Load unpacked", select `dist/chrome`
   - Firefox: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", select `manifest.json` from `dist/firefox`
   - Edge: Same as Chrome, but use `edge://extensions/`

3. **Make Changes**

   - Edit files in the `src/` directory
   - Webpack will automatically rebuild
   - Reload the extension in your browser to see changes

4. **Debug**
   - **Content Script**: Right-click on Facebook page → Inspect → Console tab
   - **Popup**: Right-click on extension icon → Inspect popup
   - **Background**: Go to `chrome://extensions/` → Click "service worker" link under extension

### Building for Production

```bash
# Build for all browsers
npm run build:all

# Output will be in:
# - dist/chrome/
# - dist/firefox/
# - dist/edge/
```

### Creating Release Packages

```bash
# After building, create zip files for distribution
cd dist/chrome && zip -r ../chrome-extension.zip . && cd ../..
cd dist/firefox && zip -r ../firefox-extension.xpi . && cd ../..
cd dist/edge && zip -r ../edge-extension.zip . && cd ../..
```

## 🏗️ Architecture

### Technology Stack

- **TypeScript** - Type-safe code with strict mode enabled
- **React 18** - Modern UI with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework
- **Webpack 5** - Module bundler with optimization
- **WebExtension Polyfill** - Cross-browser compatibility
- **Manifest V3** - Latest extension manifest version

### Key Design Patterns

#### Content Script

- Uses MutationObserver to detect new content
- Implements throttling and debouncing for performance
- Batch processing to minimize DOM operations
- Smart element detection with multilingual support

#### Storage Service

- Centralized settings management
- Uses browser.storage.sync for cross-device sync
- Export/Import functionality for backup
- Type-safe operations with TypeScript

#### Component Architecture

- Functional components with React hooks
- Separation of concerns (UI/Logic/API)
- Reusable components with clear props interfaces
- Responsive design with Tailwind CSS

### Performance Optimizations

1. **Throttled MutationObserver** - Limits DOM observation frequency
2. **Debounced Processing** - Batches element processing
3. **Lazy Loading** - Only processes visible content
4. **Smart Selectors** - Efficient CSS selectors for element detection
5. **Code Splitting** - Webpack optimization for smaller bundles

## 🔧 Configuration

### Adding New Features

1. **Add Type Definition** (`src/types/index.ts`)

```typescript
export type FeatureKey = 'newFeature' | /* existing types */;
```

2. **Update Constants** (`src/constants/index.ts`)

```typescript
export const FEATURES: Feature[] = [
  {
    key: 'newFeature',
    label: 'New Feature',
    icon: '🎯',
    description: 'Description of new feature',
    enabled: true,
  },
  // ... existing features
];
```

3. **Implement Detection** (`src/content/contentScript.ts`)

```typescript
private isNewFeature(element: Element): boolean {
  // Detection logic
  return /* condition */;
}

// Add to analyzeAndFilterElement method
if (this.settings.newFeature && this.isNewFeature(element)) {
  hideElement(htmlElement);
}
```

### Updating Facebook Selectors

Facebook frequently changes their DOM structure. Update selectors in `src/constants/index.ts`:

```typescript
export const FACEBOOK_SELECTORS = {
  // Update these when Facebook changes
  SPONSORED_TEXT: 'span:has-text("Sponsored")',
  // ... other selectors
};
```

## 🐛 Troubleshooting

### Extension Not Working

1. **Check Clean Mode**: Make sure "Clean Mode" is enabled in the popup
2. **Reload Facebook**: Refresh the Facebook page after changing settings
3. **Check Console**: Open browser console (F12) and look for errors
4. **Reinstall Extension**: Remove and reinstall the extension

### Content Not Being Filtered

1. **Facebook Updates**: Facebook may have changed their DOM structure
2. **Update Selectors**: Check and update `FACEBOOK_SELECTORS` in constants
3. **Report Issue**: Open an issue on GitHub with details

### Performance Issues

1. **Too Many Features**: Try disabling some features you don't need
2. **Browser Extensions**: Other extensions may conflict
3. **Browser Cache**: Clear browser cache and reload

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- Follow TypeScript strict mode guidelines
- Use ESLint configuration provided
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WebExtension Polyfill](https://github.com/mozilla/webextension-polyfill) for cross-browser compatibility
- [React](https://reactjs.org/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [TypeScript](https://www.typescriptlang.org/) for type safety

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/swe-tranquang/clarity-for-facebook/issues)
- **Email**: support@swe-tranquang.com
- **Website**: [swe-tranquang.com](https://swe-tranquang.com)

## 🗺️ Roadmap

- [ ] Statistics dashboard showing filtered content count
- [ ] Custom keyword filtering
- [ ] Schedule filtering (time-based rules)
- [ ] Dark mode theme
- [ ] Support for Instagram
- [ ] Machine learning-based content detection
- [ ] Mobile browser support

---

Made with ❤️ by [swe-tranquang](https://swe-tranquang.com)

⭐ Star this repo if you find it useful!
