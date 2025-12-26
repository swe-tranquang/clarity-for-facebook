# Development Guide

Comprehensive guide for developers contributing to Clarity for Facebook.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Building](#building)
- [Publishing](#publishing)
- [Best Practices](#best-practices)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: 16.x or higher
- **npm**: 8.x or higher
- **Git**: Latest version
- **Code Editor**: VS Code recommended with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/hiki-studio/clarity-for-facebook.git
cd clarity-for-facebook

# Install dependencies
npm install

# Verify installation
npm run type-check
```

## Project Architecture

### Directory Structure

```
src/
├── background/          # Background scripts
│   └── background.ts   # Service worker for Chrome/Edge
├── content/            # Content scripts
│   └── contentScript.ts # Main content script
├── popup/              # Popup UI
│   ├── components/     # React components
│   ├── index.tsx       # React entry point
│   ├── popup.html      # Popup HTML
│   └── styles.css      # Global styles
├── types/              # TypeScript types
├── constants/          # App constants
└── utils/              # Utility functions
```

### Component Breakdown

#### Background Script (`background.ts`)

- Handles extension lifecycle events
- Manages cross-component communication
- Listens for storage changes
- Coordinates tab updates

**Key Responsibilities:**
- Installation/update handling
- Message routing
- Settings synchronization

#### Content Script (`contentScript.ts`)

- Runs on Facebook pages
- Observes DOM changes
- Filters unwanted content
- Performance-optimized with throttling/debouncing

**Key Methods:**
- `init()` - Initialize content script
- `startObserver()` - Set up MutationObserver
- `analyzeAndFilterElement()` - Check and hide elements
- `cleanupPage()` - Process entire page

#### Popup UI (`popup/`)

- React-based user interface
- Settings management
- Export/import functionality
- Real-time updates

**Components:**
- `Popup.tsx` - Main container
- `Header.tsx` - Top section with actions
- `FeatureToggle.tsx` - Individual feature control
- `Footer.tsx` - Version and links

### Data Flow

```
User Action (Popup)
    ↓
Storage Service (saves settings)
    ↓
Background Script (notifies)
    ↓
Content Script (applies changes)
    ↓
Facebook DOM (filtered)
```

## Development Workflow

### 1. Development Mode

```bash
npm run dev
```

This starts Webpack in watch mode. Changes to source files trigger automatic rebuilds.

### 2. Load Extension

#### Chrome/Edge
1. Navigate to `chrome://extensions/` or `edge://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `dist/chrome/` or `dist/edge/`

#### Firefox
1. Navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select any file in `dist/firefox/`

### 3. Testing Changes

1. Make changes to source files
2. Wait for Webpack rebuild
3. Reload extension in browser:
   - Chrome/Edge: Click reload icon on extension card
   - Firefox: Click "Reload" button
4. Refresh Facebook page
5. Test your changes

### 4. Debugging

#### Content Script
```javascript
// Add console logs in contentScript.ts
console.log('Debug info:', data);

// View in Facebook page console
// Right-click page → Inspect → Console
```

#### Popup
```javascript
// Add console logs in Popup.tsx
console.log('Popup state:', state);

// View in popup console
// Right-click extension icon → Inspect popup
```

#### Background Script
```javascript
// Add console logs in background.ts
console.log('Background event:', event);

// View in extension console
// chrome://extensions/ → Click "service worker"
```

### 5. Code Style

We use ESLint and TypeScript strict mode:

```bash
# Check for errors
npm run lint

# Auto-fix errors
npm run lint:fix

# Type checking
npm run type-check
```

## Testing

### Manual Testing Checklist

- [ ] Clean Mode toggle works
- [ ] Individual feature toggles work
- [ ] Settings persist after browser restart
- [ ] Settings sync across devices (if signed in)
- [ ] Export/Import functionality works
- [ ] Reset button restores defaults
- [ ] Content is properly filtered on Facebook
- [ ] No console errors
- [ ] Performance is acceptable (no lag)

### Testing Facebook Scenarios

1. **Feed Scrolling**
   - Scroll through feed
   - Verify content is filtered
   - Check for false positives

2. **Search Results**
   - Search for content
   - Verify sponsored results are hidden

3. **Marketplace**
   - Visit Marketplace
   - Verify ads are filtered

4. **Profile Pages**
   - Visit different profiles
   - Verify suggestions are hidden

### Performance Testing

```javascript
// Add to contentScript.ts for profiling
console.time('filterOperation');
// ... filtering code ...
console.timeEnd('filterOperation');
```

Monitor:
- DOM mutation frequency
- Processing time per batch
- Memory usage
- CPU usage

## Building

### Development Build

```bash
npm run build
```

Creates unoptimized build with source maps in `dist/`.

### Production Build

```bash
# Build for specific browser
npm run build:chrome
npm run build:firefox
npm run build:edge

# Build for all browsers
npm run build:all
```

Creates optimized builds without source maps.

### Build Output

```
dist/
├── chrome/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── popup.css
│   ├── content.js
│   ├── background.js
│   ├── vendor.js
│   └── icons/
├── firefox/
│   └── [same structure]
└── edge/
    └── [same structure]
```

## Publishing

### Pre-publish Checklist

- [ ] All tests pass
- [ ] No console errors
- [ ] Version number updated in:
  - `package.json`
  - `src/constants/index.ts`
  - All manifest files
- [ ] CHANGELOG.md updated
- [ ] README.md updated
- [ ] Icons are optimized
- [ ] Build size is under 500KB

### Chrome Web Store

1. **Build Package**
   ```bash
   npm run build:chrome
   cd dist/chrome
   zip -r ../../chrome-extension.zip .
   cd ../..
   ```

2. **Upload**
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Upload `chrome-extension.zip`
   - Fill in store listing details
   - Submit for review

### Firefox Add-ons

1. **Build Package**
   ```bash
   npm run build:firefox
   cd dist/firefox
   zip -r ../../firefox-extension.xpi .
   cd ../..
   ```

2. **Upload**
   - Go to [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
   - Upload `firefox-extension.xpi`
   - Fill in listing details
   - Submit for review

### Microsoft Edge Add-ons

1. **Build Package**
   ```bash
   npm run build:edge
   cd dist/edge
   zip -r ../../edge-extension.zip .
   cd ../..
   ```

2. **Upload**
   - Go to [Edge Add-ons Dashboard](https://partner.microsoft.com/dashboard/microsoftedge/overview)
   - Upload `edge-extension.zip`
   - Fill in listing details
   - Submit for review

## Best Practices

### TypeScript

```typescript
// ✅ Good: Use specific types
function filterElement(element: HTMLElement): boolean {
  return element.dataset.hidden === 'true';
}

// ❌ Bad: Avoid 'any'
function filterElement(element: any): any {
  return element.dataset.hidden === 'true';
}
```

### React Components

```typescript
// ✅ Good: Use functional components with TypeScript
interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Component: React.FC<Props> = ({ value, onChange }) => {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
};

// ❌ Bad: Class components or no types
class Component extends React.Component {
  render() {
    return <input />;
  }
}
```

### Performance

```typescript
// ✅ Good: Use throttle/debounce
const throttledHandler = throttle(handleMutations, 300);
observer.observe(container, { ...config });

// ❌ Bad: Process every mutation
observer.observe(container, {
  childList: true,
  subtree: true,
});
```

### Error Handling

```typescript
// ✅ Good: Handle errors gracefully
try {
  await StorageService.saveSettings(settings);
  showMessage('success', 'Settings saved');
} catch (error) {
  console.error('Save failed:', error);
  showMessage('error', 'Failed to save settings');
}

// ❌ Bad: Ignore errors
await StorageService.saveSettings(settings);
showMessage('success', 'Settings saved');
```

### Code Documentation

```typescript
// ✅ Good: Document complex functions
/**
 * Analyze element and hide if it matches filter criteria
 * @param element - DOM element to analyze
 * @returns true if element was hidden
 */
private analyzeAndFilterElement(element: Element): boolean {
  // Implementation
}

// ❌ Bad: No documentation
private analyzeAndFilterElement(element: Element): boolean {
  // Implementation
}
```

### Commit Messages

Follow conventional commits:

```bash
# ✅ Good
feat: add dark mode support
fix: resolve memory leak in observer
docs: update installation instructions
refactor: simplify storage service

# ❌ Bad
update stuff
fixes
changes
```

## Useful Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Firefox Extension Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [WebExtension Polyfill](https://github.com/mozilla/webextension-polyfill)
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Getting Help

- Open an issue on GitHub
- Join our Discord community
- Email: dev@hiki-studio.com

---

Happy coding! 🚀

