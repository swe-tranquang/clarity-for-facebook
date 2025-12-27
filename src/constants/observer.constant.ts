/**
 * CSS selectors for Facebook elements (updated for 2024 Facebook)
 * Note: Facebook frequently changes these selectors, may need updates
 */
export const FACEBOOK_SELECTORS = {
  // Main feed container
  FEED_CONTAINER: '[role="feed"]',

  // Individual post containers
  POST: 'div[data-pagelet^="FeedUnit"]',

  // Reels
  REELS_CONTAINER: 'div[aria-label*="Reels" i]',
  REELS_VIDEO: 'a[href*="/reel/"]',

  // Sponsored content
  SPONSORED_TEXT: 'span:has-text("Sponsored"), span:has-text("Được tài trợ")',
  SPONSORED_LABEL: 'a[aria-label*="Sponsored" i], a[aria-label*="tài trợ" i]',

  // Suggested posts
  SUGGESTED_TEXT: 'span:has-text("Suggested for you"), span:has-text("Gợi ý cho bạn")',

  // Marketplace
  MARKETPLACE_LINK: 'a[href*="/marketplace/"]',
  MARKETPLACE_AD: 'div[data-pagelet*="Marketplace"]',

  // People you may know
  PYMK_CONTAINER: 'div[aria-label*="People you may know" i], div[aria-label*="Những người bạn có thể biết" i]',

  // Follow suggestions
  FOLLOW_BUTTON: 'div[aria-label="Follow" i], div[aria-label="Theo dõi" i]',

  // Search ads
  SEARCH_SPONSORED: 'div[role="article"]:has(span:has-text("Sponsored"))',
} as const;

/**
 * Performance configuration
 */
export const PERFORMANCE_CONFIG = {
  OBSERVER_THROTTLE: 300, // ms
  CLEANUP_DEBOUNCE: 500, // ms
  MAX_BATCH_SIZE: 50, // Max elements to process per batch
} as const;

/**
 * Mutation observer configuration
 */
export const OBSERVER_CONFIG: MutationObserverInit = {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false,
};
