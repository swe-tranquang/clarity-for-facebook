import browser from 'webextension-polyfill';
import type { ExtensionSettings } from '@/types';
import type { FeatureContext } from './types';
import { BaseFeature, createFeatures } from './features';
import { SettingsService, ObserverService, PostParserService, StyleInjectorService } from './services';

/**
 * Main content script class for Facebook content filtering
 * Acts as an orchestrator for features and services
 */
class ClarityContentScript {
  private features: BaseFeature[] = [];
  private settingsService = new SettingsService();
  private parserService = new PostParserService();
  private observerService = new ObserverService();
  private styleInjector = new StyleInjectorService();
  private processedPosts = new WeakSet<Element>();
  private isInitialized = false;

  constructor() {
    this.init();
  }

  /**
   * Initialize the content script
   */
  private async init(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    console.log('[Clarity] 🚀 Initializing content script...');

    // 0. Initialize style injector FIRST (before any content renders)
    this.styleInjector.init();

    // 1. Load settings
    const settings = await this.settingsService.loadSettings();

    // 1.5. Update style injector with initial settings
    this.styleInjector.updateHiddenTypes(settings.removeSuggested, settings.removeSponsored, settings.removeStories);

    // 2. Initialize features
    this.features = createFeatures();
    this.syncFeatureStates(settings);

    // 3. Listen for settings changes
    this.settingsService.onSettingsChange((s) => this.syncFeatureStates(s));
    this.settingsService.startListening();

    // 4. Start observer
    this.observerService.start(() => this.processAllPosts());

    // 5. Initial scan after shorter delay
    setTimeout(() => {
      this.processAllPosts();
    }, 500);

    // 6. Periodic scan for lazy-loaded content (less frequent since observer handles most)
    setInterval(() => {
      this.processAllPosts();
    }, 3000);

    this.isInitialized = true;
    console.log('[Clarity] ✅ Content script initialized');
  }

  /**
   * Process all posts on the page
   */
  private processAllPosts(): void {
    const posts = this.parserService.getAllPosts();
    let newPostsCount = 0;

    for (const postElement of posts) {
      // Skip already processed posts
      if (this.processedPosts.has(postElement)) {
        continue;
      }

      this.processedPosts.add(postElement);
      newPostsCount++;

      // Parse post
      const parsedPost = this.parserService.parsePost(postElement);
      const context: FeatureContext = { postElement, parsedPost };

      // Log for debugging
      if (parsedPost.author || parsedPost.content) {
        console.log(`[Clarity] 📝 Post from ${parsedPost.author || 'Unknown'}:`, {
          source: parsedPost.source,
          content: parsedPost.content?.slice(0, 100),
        });
      }

      // Run all enabled features to check if post should be hidden
      let shouldHide = false;
      for (const feature of this.features) {
        const wasFiltered = feature.execute(context);
        if (wasFiltered) {
          // Feature decided to hide this post
          shouldHide = true;
          break;
        }
      }

      // Apply visibility - either hide permanently or approve to show
      if (shouldHide) {
        this.styleInjector.markAsHidden(postElement);
      } else {
        this.styleInjector.markAsApproved(postElement);
      }
    }

    if (newPostsCount > 0) {
      console.log(`[Clarity] 📊 Processed ${newPostsCount} new posts`);
    }
  }

  /**
   * Sync feature states with settings
   */
  private syncFeatureStates(settings: ExtensionSettings): void {
    for (const feature of this.features) {
      const enabled = settings[feature.key] as boolean;
      feature.setEnabled(enabled);
    }

    // Update style injector when settings change
    this.styleInjector.updateHiddenTypes(settings.removeSuggested, settings.removeSponsored, settings.removeStories);
  }

  /**
   * Get statistics
   */
  public getStats() {
    return {
      totalPosts: this.parserService.getAllPosts().length,
      featuresEnabled: this.features.filter((f) => f.isEnabled()).length,
    };
  }

  /**
   * Manually trigger a rescan
   */
  public rescan(): void {
    console.log('[Clarity] 🔄 Manual rescan triggered');
    this.processedPosts = new WeakSet<Element>();
    this.processAllPosts();
  }
}

// Initialize content script
const clarityScript = new ClarityContentScript();

// Listen for messages from popup/background
browser.runtime.onMessage.addListener((message) => {
  if (message.type === 'GET_STATS') {
    return Promise.resolve(clarityScript.getStats());
  }
  if (message.type === 'RESCAN') {
    clarityScript.rescan();
    return Promise.resolve({ success: true });
  }
  return Promise.resolve();
});

// Expose to window for debugging
(window as unknown as { clarityScript: ClarityContentScript }).clarityScript = clarityScript;
