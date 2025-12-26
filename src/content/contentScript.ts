import browser from 'webextension-polyfill';
import type { ExtensionSettings } from '@/types';
import { StorageService } from '@/utils/storage';
import {
  debounce,
  throttle,
  containsText,
  hideElement,
  showElement,
  isHiddenByExtension,
  findClosestParent,
} from '@/utils/helpers';
import { FACEBOOK_SELECTORS, OBSERVER_CONFIG, PERFORMANCE_CONFIG } from '@/constants';

/**
 * Main content script class for Facebook feed cleaning
 * Implements performance-optimized DOM manipulation with MutationObserver
 */
class ClarityContentScript {
  private settings: ExtensionSettings | null = null;
  private observer: MutationObserver | null = null;
  private isInitialized = false;
  private processingQueue: Set<Element> = new Set();
  private stats = {
    reelsRemoved: 0,
    sponsoredRemoved: 0,
    suggestedRemoved: 0,
    totalRemoved: 0,
  };

  constructor() {
    this.init();
  }

  /**
   * Initialize the content script
   */
  private async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load settings
      this.settings = await StorageService.getSettings();

      // Listen for settings changes
      StorageService.addChangeListener((newSettings) => {
        this.settings = newSettings;
        this.reprocessPage();
      });

      // Start observing DOM changes
      this.startObserver();

      // Initial cleanup
      this.cleanupPage();

      this.isInitialized = true;
      console.log('Clarity for Facebook: Initialized successfully');
    } catch (error) {
      console.error('Clarity for Facebook: Initialization failed', error);
    }
  }

  /**
   * Start MutationObserver to watch for new content
   */
  private startObserver(): void {
    if (this.observer) return;

    const throttledCallback = throttle(
      this.handleMutations.bind(this),
      PERFORMANCE_CONFIG.OBSERVER_THROTTLE
    );

    this.observer = new MutationObserver(throttledCallback);

    // Wait for feed container to load
    const checkFeed = setInterval(() => {
      const feedContainer = document.querySelector(FACEBOOK_SELECTORS.FEED_CONTAINER);
      if (feedContainer) {
        this.observer?.observe(feedContainer, OBSERVER_CONFIG);
        console.log('Clarity for Facebook: Observer attached to feed');
        clearInterval(checkFeed);
      }
    }, 1000);

    // Stop checking after 30 seconds
    setTimeout(() => clearInterval(checkFeed), 30000);
  }

  /**
   * Handle DOM mutations
   */
  private handleMutations(mutations: MutationRecord[]): void {
    const addedNodes: Element[] = [];

    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          addedNodes.push(node as Element);
        }
      });
    }

    if (addedNodes.length > 0) {
      this.processNodes(addedNodes);
    }
  }

  /**
   * Process nodes in batches for better performance
   */
  private processNodes(nodes: Element[]): void {
    const debouncedProcess = debounce(() => {
      const batch = Array.from(this.processingQueue).slice(
        0,
        PERFORMANCE_CONFIG.MAX_BATCH_SIZE
      );

      batch.forEach((node) => {
        this.analyzeAndFilterElement(node);
        this.processingQueue.delete(node);
      });

      if (this.processingQueue.size > 0) {
        debouncedProcess();
      }
    }, PERFORMANCE_CONFIG.CLEANUP_DEBOUNCE);

    nodes.forEach((node) => this.processingQueue.add(node));
    debouncedProcess();
  }

  /**
   * Analyze and filter a single element
   */
  private analyzeAndFilterElement(element: Element): void {
    if (!this.settings || isHiddenByExtension(element)) return;

    // Skip if clean mode is off
    if (!this.settings.cleanMode) return;

    const htmlElement = element as HTMLElement;

    // Check for Reels
    if (this.settings.removeReels && this.isReelsContent(element)) {
      const container = this.findPostContainer(element);
      if (container) {
        hideElement(container);
        this.stats.reelsRemoved++;
        this.stats.totalRemoved++;
        return;
      }
    }

    // Check for Sponsored content
    if (this.settings.removeSponsored && this.isSponsoredContent(element)) {
      const container = this.findPostContainer(element);
      if (container) {
        hideElement(container);
        this.stats.sponsoredRemoved++;
        this.stats.totalRemoved++;
        return;
      }
    }

    // Check for Suggested posts
    if (this.settings.removeSuggested && this.isSuggestedContent(element)) {
      const container = this.findPostContainer(element);
      if (container) {
        hideElement(container);
        this.stats.suggestedRemoved++;
        this.stats.totalRemoved++;
        return;
      }
    }

    // Check for Marketplace
    if (this.settings.removeMarketplace && this.isMarketplaceContent(element)) {
      const container = this.findPostContainer(element);
      if (container) {
        hideElement(container);
        this.stats.totalRemoved++;
        return;
      }
    }

    // Check for People You May Know
    if (this.settings.removePeopleYouMayKnow && this.isPeopleYouMayKnowContent(element)) {
      hideElement(htmlElement);
      this.stats.totalRemoved++;
      return;
    }

    // Check for Follow suggestions
    if (this.settings.removeFollowSuggestions && this.isFollowSuggestion(element)) {
      const container = this.findPostContainer(element);
      if (container) {
        hideElement(container);
        this.stats.totalRemoved++;
        return;
      }
    }

    // Check for Search ads
    if (this.settings.removeSearchAds && this.isSearchAd(element)) {
      hideElement(htmlElement);
      this.stats.totalRemoved++;
      return;
    }
  }

  /**
   * Check if element is Reels content
   */
  private isReelsContent(element: Element): boolean {
    const text = element.textContent?.toLowerCase() || '';
    const hasReelsText = text.includes('reels') || text.includes('reel');
    const hasReelsLink = element.querySelector('a[href*="/reel/"]') !== null;
    const hasReelsAria = element.querySelector('[aria-label*="Reels" i]') !== null;

    return hasReelsText || hasReelsLink || hasReelsAria;
  }

  /**
   * Check if element is sponsored content
   */
  private isSponsoredContent(element: Element): boolean {
    const sponsoredKeywords = [
      'sponsored',
      'được tài trợ',
      'promocionado',
      'gesponsert',
      'sponsorisé',
      'sponsorizzato',
    ];

    return containsText(element, sponsoredKeywords);
  }

  /**
   * Check if element is suggested content
   */
  private isSuggestedContent(element: Element): boolean {
    const suggestedKeywords = [
      'suggested for you',
      'gợi ý cho bạn',
      'sugerido para ti',
      'vorgeschlagen für dich',
      'suggéré pour vous',
      'suggerito per te',
    ];

    return containsText(element, suggestedKeywords);
  }

  /**
   * Check if element is marketplace content
   */
  private isMarketplaceContent(element: Element): boolean {
    return (
      element.querySelector('a[href*="/marketplace/"]') !== null ||
      element.querySelector('[data-pagelet*="Marketplace"]') !== null
    );
  }

  /**
   * Check if element is "People You May Know"
   */
  private isPeopleYouMayKnowContent(element: Element): boolean {
    const pymkKeywords = [
      'people you may know',
      'những người bạn có thể biết',
      'personas que quizás conozcas',
      'personen, die du kennen könntest',
      'personnes que vous connaissez peut-être',
      'persone che potresti conoscere',
    ];

    return containsText(element, pymkKeywords);
  }

  /**
   * Check if element is follow suggestion
   */
  private isFollowSuggestion(element: Element): boolean {
    const followButton = element.querySelector(
      'div[aria-label="Follow" i], div[aria-label="Theo dõi" i]'
    );
    const suggestedText = containsText(element, ['suggested', 'gợi ý']);

    return followButton !== null && suggestedText;
  }

  /**
   * Check if element is search ad
   */
  private isSearchAd(element: Element): boolean {
    const isInSearch = window.location.href.includes('/search/');
    const isSponsored = this.isSponsoredContent(element);

    return isInSearch && isSponsored;
  }

  /**
   * Find the post container for an element
   */
  private findPostContainer(element: Element): HTMLElement | null {
    // Try to find the main post container
    const container = findClosestParent(
      element,
      (el) =>
        el.hasAttribute('data-pagelet') &&
        el.getAttribute('data-pagelet')?.startsWith('FeedUnit') === true,
      15
    );

    return container as HTMLElement | null;
  }

  /**
   * Clean up the entire page (initial load or reprocess)
   */
  private cleanupPage(): void {
    if (!this.settings?.cleanMode) {
      this.showAllHiddenElements();
      return;
    }

    const allElements = document.querySelectorAll('div, article, section');
    this.processNodes(Array.from(allElements));
  }

  /**
   * Reprocess the entire page when settings change
   */
  private reprocessPage(): void {
    this.showAllHiddenElements();
    this.cleanupPage();
  }

  /**
   * Show all previously hidden elements
   */
  private showAllHiddenElements(): void {
    const hiddenElements = document.querySelectorAll('[data-clarity-hidden="true"]');
    hiddenElements.forEach((el) => showElement(el as HTMLElement));
  }

  /**
   * Get current statistics
   */
  public getStats() {
    return { ...this.stats };
  }

  /**
   * Reset statistics
   */
  public resetStats(): void {
    this.stats = {
      reelsRemoved: 0,
      sponsoredRemoved: 0,
      suggestedRemoved: 0,
      totalRemoved: 0,
    };
  }

  /**
   * Clean up and disconnect observer
   */
  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.showAllHiddenElements();
    this.isInitialized = false;
  }
}

// Initialize content script
const clarityScript = new ClarityContentScript();

// Listen for messages from popup/background
browser.runtime.onMessage.addListener((message) => {
  if (message.type === 'GET_STATS') {
    return Promise.resolve(clarityScript.getStats());
  }
  if (message.type === 'RESET_STATS') {
    clarityScript.resetStats();
    return Promise.resolve({ success: true });
  }
  return Promise.resolve();
});
