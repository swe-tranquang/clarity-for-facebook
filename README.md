# 🌟 Clarity for Facebook

> Clean up your Facebook feed by removing unwanted content like Reels, Stories, sponsored posts, and suggestions.

A powerful, cross-platform browser extension that gives you control over what you see on Facebook. Built with TypeScript, React, and Tailwind CSS using a modular, feature-based architecture.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://reactjs.org/)

## ✨ Features

| Feature                           | Description                                                    |
| --------------------------------- | -------------------------------------------------------------- |
| ✅ **Clean Mode**                 | Master toggle to enable/disable all filtering features at once |
| 📖 **Remove Stories**             | Hide the stories tray from your feed                           |
| 🎬 **Remove Reels**               | Hide all Reels from your feed                                  |
| 💰 **Remove Sponsored Posts**     | Block all sponsored and promoted content                       |
| 👥 **Remove Suggested Posts**     | Hide "Suggested for you" posts                                 |
| 🏪 **Remove Marketplace Ads**     | Filter out Marketplace advertisements                          |
| 🔍 **Remove Search Ads**          | Clean sponsored results in search                              |
| 👤 **Remove People You May Know** | Filter friend suggestions                                      |
| 🎯 **Remove Group Suggestions**   | Hide group suggestions                                         |

## 🚀 Installation

### For Users

#### Chrome/Edge

1. Download the latest release from [Releases](https://github.com/user/clarity-for-facebook/releases)
2. Unzip the downloaded file
3. Open Chrome/Edge and go to `chrome://extensions/` or `edge://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the unzipped folder
6. The extension icon should appear in your toolbar

#### Firefox

1. Download the `.xpi` file from [Releases](https://github.com/user/clarity-for-facebook/releases)
2. Open Firefox and go to `about:addons`
3. Click the gear icon and select "Install Add-on From File"
4. Select the downloaded `.xpi` file
5. Click "Add" when prompted

### For Developers

See [Development Guide](#-development) below.

## 📖 Usage

1. Click the extension icon in your browser toolbar
2. Toggle **"Clean Mode"** to activate the extension (master switch)
3. Customize which content types you want to filter
4. Your settings are automatically saved and synced across devices
5. Visit Facebook and enjoy a cleaner feed!

### Export/Import Settings

- **Export**: Click the Export button to save your settings as a JSON file
- **Import**: Click the Import button to load settings from a JSON file
- **Reset**: Click the Reset button to restore default settings

## 🛠️ Development

### Prerequisites

- Node.js 16+ and npm
- TypeScript 5.3+
- A modern browser (Chrome/Edge/Firefox)

### Setup

```bash
# Clone the repository
git clone https://github.com/user/clarity-for-facebook.git
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
│   ├── background/                 # Background service worker
│   │   └── background.ts
│   ├── content/                    # Content scripts (DOM manipulation)
│   │   ├── contentScript.ts        # Main orchestrator
│   │   ├── content.css             # Injected styles
│   │   ├── features/               # Feature modules (modular architecture)
│   │   │   ├── base.feature.ts     # Base class for all features
│   │   │   ├── reels.feature.ts
│   │   │   ├── stories.feature.ts
│   │   │   ├── suggested.feature.ts
│   │   │   ├── people-you-may-know.feature.ts
│   │   │   ├── group-suggestions.feature.ts
│   │   │   └── index.ts
│   │   └── services/               # Shared services
│   │       ├── observer.service.ts      # DOM MutationObserver
│   │       ├── post-parser.service.ts   # Facebook post parsing
│   │       ├── settings.service.ts      # Settings management
│   │       └── style-injector.service.ts
│   ├── popup/                      # React popup UI
│   │   ├── components/
│   │   │   ├── Popup.tsx           # Main popup component
│   │   │   ├── Header.tsx          # Header with actions
│   │   │   ├── Footer.tsx          # Footer with links
│   │   │   ├── FeatureToggle.tsx   # Toggle component
│   │   │   └── icons/              # Custom SVG icon components
│   │   │       ├── CleanModeIcon.tsx
│   │   │       ├── RemoveStoriesIcon.tsx
│   │   │       ├── RemoveReelsIcon.tsx
│   │   │       ├── RemoveSponsoredIcon.tsx
│   │   │       ├── RemoveSuggestedIcon.tsx
│   │   │       ├── RemoveMarketplaceIcon.tsx
│   │   │       ├── RemoveSearchAdsIcon.tsx
│   │   │       ├── RemovePeopleYouMayKnowIcon.tsx
│   │   │       ├── RemoveGroupSuggestionsIcon.tsx
│   │   │       └── index.ts
│   │   ├── index.tsx
│   │   ├── popup.html
│   │   └── styles.css
│   ├── types/                      # TypeScript type definitions
│   │   └── index.ts
│   ├── constants/                  # Constants and configuration
│   │   ├── index.ts
│   │   ├── extension.constant.ts   # Extension settings & features
│   │   ├── observer.constant.ts    # Observer configuration
│   │   └── facebook-selectors.constant.ts  # Multi-language selectors
│   ├── utils/                      # Utility functions
│   │   ├── storage.ts
│   │   └── helpers.ts
│   └── icons/                      # Extension icons
│       ├── icon.svg
│       ├── icon-16.png
│       ├── icon-32.png
│       ├── icon-48.png
│       └── icon-128.png
├── manifests/                      # Browser-specific manifests
│   ├── manifest.chrome.json
│   ├── manifest.firefox.json
│   └── manifest.edge.json
├── dist/                           # Build output (generated)
│   ├── chrome/
│   ├── firefox/
│   └── edge/
├── webpack.config.js
├── tsconfig.json
├── tailwind.config.js
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

## 🏗️ Architecture

### Technology Stack

- **TypeScript** - Type-safe code with strict mode enabled
- **React 18** - Modern UI with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework
- **Webpack 5** - Module bundler with optimization
- **WebExtension Polyfill** - Cross-browser compatibility
- **Manifest V3** - Latest extension manifest version

### Key Design Patterns

#### Feature-Based Architecture

The content script uses a modular feature-based architecture:

```
BaseFeature (abstract)
├── ReelsFeature
├── StoriesFeature
├── SuggestedPostsFeature
├── PeopleYouMayKnowFeature
└── GroupSuggestionsFeature
```

Each feature implements:

- `shouldProcess(element)` - Determine if element should be processed
- `process(element)` - Hide/remove the element

#### Services Layer

- **ObserverService** - MutationObserver for detecting new content
- **PostParserService** - Parse Facebook posts with multi-language support
- **SettingsService** - Centralized settings management with sync
- **StyleInjectorService** - Inject CSS for smooth hiding animations

#### Clean Mode Logic

`cleanMode` acts as a master switch:

- When **OFF**: All filtering is disabled regardless of individual settings
- When **ON**: Individual feature settings take effect

### Performance Optimizations

1. **Pre-hiding CSS** - Elements hidden before paint to prevent flickering
2. **Throttled MutationObserver** - Limits DOM observation frequency
3. **Debounced Processing** - Batches element processing
4. **Smart Selectors** - Efficient CSS selectors for element detection
5. **Code Splitting** - Webpack optimization for smaller bundles

## 🔧 Configuration

### Adding New Features

1. **Create Feature Class** (`src/content/features/new.feature.ts`)

```typescript
import { BaseFeature } from './base.feature';
import type { ExtensionSettings } from '@/types';

export class NewFeature extends BaseFeature {
  constructor(settings: ExtensionSettings) {
    super(settings, 'newFeature');
  }

  shouldProcess(element: Element): boolean {
    // Detection logic
    return /* condition */;
  }

  process(element: HTMLElement): void {
    element.style.display = 'none';
  }
}
```

2. **Register Feature** (`src/content/features/index.ts`)

```typescript
export { NewFeature } from './new.feature';
```

3. **Add Type Definition** (`src/types/index.ts`)

```typescript
export type FeatureKey = 'newFeature' | /* existing types */;
```

4. **Update Constants** (`src/constants/extension.constant.ts`)

```typescript
export const FEATURES: Feature[] = [
  {
    key: 'newFeature',
    label: 'New Feature',
    description: 'Description of new feature',
    enabled: true,
  },
  // ... existing features
];
```

5. **Create Icon Component** (`src/popup/components/icons/NewFeatureIcon.tsx`)

### Multi-Language Selectors

Facebook selectors support multiple languages. Update in `src/constants/facebook-selectors.constant.ts`:

```typescript
export const SPONSORED_TEXTS = [
  'Sponsored', // English
  'Được tài trợ', // Vietnamese
  'スポンサー', // Japanese
  // Add more languages...
];
```

## 🐛 Troubleshooting

### Extension Not Working

1. **Check Clean Mode**: Make sure "Clean Mode" is enabled in the popup
2. **Reload Facebook**: Refresh the Facebook page after changing settings
3. **Check Console**: Open browser console (F12) and look for errors
4. **Reinstall Extension**: Remove and reinstall the extension

### Content Not Being Filtered

1. **Facebook Updates**: Facebook may have changed their DOM structure
2. **Language Support**: Check if your Facebook language is supported
3. **Update Selectors**: Check and update selectors in constants
4. **Report Issue**: Open an issue on GitHub with details

### Flickering Issues

The extension uses CSS pre-hiding to prevent flickering. If you still see issues:

1. Check that `content.css` is being loaded
2. Verify the StyleInjectorService is working
3. Report the specific element causing issues

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

## 🗺️ Roadmap

- [ ] Statistics dashboard showing filtered content count
- [ ] Custom keyword filtering
- [ ] Schedule filtering (time-based rules)
- [ ] Dark mode theme
- [ ] Support for Instagram
- [ ] Machine learning-based content detection
- [ ] Mobile browser support

---

Made with ❤️ for a cleaner Facebook experience

⭐ Star this repo if you find it useful!
