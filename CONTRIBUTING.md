# Contributing to Clarity for Facebook

First off, thank you for considering contributing to Clarity for Facebook! 🎉

It's people like you that make Clarity for Facebook such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your browser version and OS**

**Bug Report Template:**

```markdown
## Description
[Clear description of the bug]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
[What you expected to happen]

## Actual Behavior
[What actually happened]

## Screenshots
[If applicable]

## Environment
- Browser: [Chrome/Firefox/Edge]
- Browser Version: [e.g. 120.0]
- OS: [e.g. Windows 11, macOS 14]
- Extension Version: [e.g. 1.0.0]

## Additional Context
[Any other relevant information]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

1. **Fork the repository**
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**:
   - Follow the existing code style
   - Add/update tests if applicable
   - Update documentation if needed

4. **Commit your changes**:
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

5. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**

## Development Process

### Setting Up Your Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/clarity-for-facebook.git
cd clarity-for-facebook

# Add upstream remote
git remote add upstream https://github.com/hiki-studio/clarity-for-facebook.git

# Install dependencies
npm install

# Start development mode
npm run dev
```

### Coding Standards

#### TypeScript

- Use TypeScript strict mode
- Avoid `any` type - use proper types
- Document public APIs with JSDoc comments
- Use meaningful variable names

```typescript
// ✅ Good
interface UserSettings {
  darkMode: boolean;
  notifications: boolean;
}

function updateSettings(settings: UserSettings): Promise<void> {
  // Implementation
}

// ❌ Bad
function update(data: any): any {
  // Implementation
}
```

#### React Components

- Use functional components with hooks
- Use TypeScript interfaces for props
- Keep components small and focused
- Extract reusable logic into custom hooks

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// ❌ Bad
const Button = (props: any) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

#### CSS/Tailwind

- Use Tailwind utility classes
- Keep custom CSS minimal
- Follow mobile-first approach
- Use semantic class names for custom CSS

```tsx
// ✅ Good
<div className="flex items-center justify-between p-4 rounded-lg bg-primary-50">
  <span className="text-sm font-medium">Content</span>
</div>

// ❌ Bad
<div style={{ display: 'flex', padding: '16px' }}>
  <span>Content</span>
</div>
```

#### Performance

- Use throttle/debounce for frequent operations
- Minimize DOM manipulations
- Use React.memo for expensive components
- Batch state updates

```typescript
// ✅ Good
const throttledHandler = throttle(handler, 300);
observer.observe(element, config);

// ❌ Bad
observer.observe(element, {
  childList: true,
  subtree: true,
  attributes: true, // Too many observations
});
```

### Testing

Before submitting a PR, ensure:

- [ ] Code builds without errors (`npm run build`)
- [ ] TypeScript checks pass (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Extension loads in browser without errors
- [ ] Manual testing on Facebook is successful
- [ ] No console errors or warnings
- [ ] Performance is acceptable

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Feature
feat: add dark mode support

# Bug fix
fix: resolve memory leak in observer

# Documentation
docs: update installation instructions

# Refactoring
refactor: simplify storage service

# Performance
perf: optimize DOM filtering

# Tests
test: add unit tests for storage service

# Build/CI
build: update webpack configuration
ci: add GitHub Actions workflow

# Chore
chore: update dependencies
```

## Project Structure

Understanding the project structure will help you contribute more effectively:

```
src/
├── background/          # Background service worker
│   └── background.ts   # Lifecycle management
├── content/            # Content scripts
│   └── contentScript.ts # Main filtering logic
├── popup/              # React UI
│   ├── components/     # React components
│   ├── index.tsx       # Entry point
│   └── styles.css      # Global styles
├── types/              # TypeScript types
│   └── index.ts        # Type definitions
├── constants/          # Configuration
│   └── index.ts        # App constants
└── utils/              # Utilities
    ├── storage.ts      # Storage service
    └── helpers.ts      # Helper functions
```

## Areas for Contribution

### High Priority

- **Performance Optimization**: Improve filtering speed
- **Facebook Selector Updates**: Keep selectors up-to-date
- **Cross-browser Testing**: Ensure compatibility
- **Accessibility**: Improve a11y features

### Medium Priority

- **New Features**: Statistics, custom filters, etc.
- **UI Improvements**: Better UX, animations
- **Internationalization**: Add more languages
- **Documentation**: Improve guides and examples

### Low Priority

- **Code Refactoring**: Improve code quality
- **Tests**: Add automated tests
- **CI/CD**: Improve build pipeline
- **Dev Tools**: Better development experience

## Getting Help

- **Discord**: [Join our community](https://discord.gg/hiki-studio)
- **GitHub Discussions**: [Ask questions](https://github.com/hiki-studio/clarity-for-facebook/discussions)
- **Email**: dev@hiki-studio.com

## Recognition

Contributors will be:
- Added to the Contributors section in README
- Mentioned in release notes
- Given a shoutout on social media (if desired)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Clarity for Facebook! 🙏

Every contribution, no matter how small, is valuable and appreciated.

