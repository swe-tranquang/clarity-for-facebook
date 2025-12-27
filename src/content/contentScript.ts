import browser from 'webextension-polyfill';
import { OBSERVER_CONFIG, FEED_HEADER_TEXTS, FOLLOW_BUTTON_TEXTS, SPONSORED_TEXTS, matchesAny, matchesExact } from '@/constants';
import type { ParsedPost, PostSource } from '@/types';

/**
 * Detect the source of a post (following, suggested, or sponsored)
 */
function detectPostSource(postElement: Element): PostSource {
  // Check for sponsored indicators first
  const allSpans = postElement.querySelectorAll('span');
  for (const span of allSpans) {
    const text = span.textContent?.trim();
    if (matchesExact(text, SPONSORED_TEXTS)) {
      return 'sponsored';
    }
  }

  // Check for Follow button (indicates suggested post)
  for (const span of allSpans) {
    const text = span.textContent?.trim();
    if (matchesExact(text, FOLLOW_BUTTON_TEXTS)) {
      return 'suggested';
    }
  }

  // Default to following (posts from people you follow)
  return 'following';
}

/**
 * Parse a Facebook post element into structured JSON
 */
function parsePost(postElement: Element): ParsedPost {
  // Try multiple selectors for author name
  const authorSelectors = [
    '[data-ad-rendering-role="profile_name"] span',
    'h4 a span',
    'h3 a span',
    'strong a',
    'a[role="link"] span strong',
    'h2 span a strong span',
    'span a strong span',
  ];

  let author: string | null = null;
  for (const selector of authorSelectors) {
    const el = postElement.querySelector(selector);
    if (el?.textContent?.trim()) {
      author = el.textContent.trim();
      break;
    }
  }

  // Try multiple selectors for content
  const contentSelectors = ['[data-ad-rendering-role="story_message"]', '[data-ad-comet-preview="message"]', 'div[dir="auto"]', 'span[dir="auto"]'];

  let content: string | null = null;
  for (const selector of contentSelectors) {
    const el = postElement.querySelector(selector);
    const text = el?.textContent?.trim();
    if (text && text.length > 20) {
      content = text.slice(0, 500);
      break;
    }
  }

  // Get post link
  const postLinkEl = postElement.querySelector('a[href*="?__cft__"], a[href*="/posts/"], a[href*="/permalink/"]') as HTMLAnchorElement;
  const postLink = postLinkEl?.href || null;

  // Get images
  const images = Array.from(postElement.querySelectorAll('img[src*="fbcdn"], img[alt]'))
    .filter((img) => {
      const src = (img as HTMLImageElement).src;
      return src && !src.includes('emoji') && !src.includes('static');
    })
    .map((img) => (img as HTMLImageElement).src)
    .slice(0, 5);

  // Get reactions
  const reactionLabels = Array.from(postElement.querySelectorAll('[aria-label*="reaction"], [aria-label*="like"]'));
  let totalReactions = '0';
  for (const el of reactionLabels) {
    const label = el.getAttribute('aria-label') || '';
    const match = label.match(/(\d+)/);
    if (match) {
      totalReactions = match[1];
      break;
    }
  }

  // Get comments count
  const commentMatch = postElement.textContent?.match(/(\d+)\s*(comment|bình luận)/i);
  const comments = commentMatch ? commentMatch[1] : '0';

  // Get shares count
  const shareMatch = postElement.textContent?.match(/(\d+)\s*(share|chia sẻ)/i);
  const shares = shareMatch ? shareMatch[1] : '0';

  // Detect post source
  const source = detectPostSource(postElement);

  return {
    author,
    content,
    postLink,
    images,
    reactions: { total: totalReactions, like: '0', love: '0' },
    comments,
    shares,
    source,
  };
}

/**
 * Track posts that have already been logged to avoid duplicates
 */
const loggedPosts = new Set<string>();

/**
 * Find the feed container by looking for h3 with feed header text (multi-language)
 */
function findFeedPostsContainer(): Element | null {
  const h3Elements = document.querySelectorAll('h3');

  for (const h3 of h3Elements) {
    const text = h3.textContent?.trim();
    if (matchesAny(text, FEED_HEADER_TEXTS)) {

      const parentDiv = h3.parentElement;
      if (parentDiv) {
        const children = parentDiv.children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.tagName === 'DIV' && child.getAttribute('aria-hidden') !== 'true') {
            const postContainers = child.children;
            if (postContainers.length > 0) {
              return child;
            }
          }
        }
      }
    }
  }
  return null;
}

/**
 * Scan and log all posts on the page
 */
function scanAndLogPosts(): void {
  const feedContainer = findFeedPostsContainer();

  let allPosts: Element[] = [];

  if (feedContainer) {
    allPosts = Array.from(feedContainer.children);
  } else {
    const articlePosts = document.querySelectorAll('[role="article"]');
    allPosts = Array.from(articlePosts);
  }

  let newPostsLogged = 0;

  allPosts.forEach((post, index) => {
    const parsed = parsePost(post);
    const postKey = `post-${index}-${parsed.content?.slice(0, 50) || post.textContent?.slice(0, 50)}`;

    if (!loggedPosts.has(postKey)) {
      loggedPosts.add(postKey);
      newPostsLogged++;

      if (parsed.author || parsed.content) {
        console.log(`[Clarity] 📝 Post ${index + 1}:`);
        console.log(JSON.stringify(parsed, null, 2));
      } else {
        const childCount = post.querySelectorAll('*').length;
        const textPreview = post.textContent?.slice(0, 200)?.replace(/\s+/g, ' ') || '';
        console.log(`[Clarity] ⚠️ Post ${index + 1} - Could not parse`);
        console.log(`[Clarity]    Child elements: ${childCount}, Text: ${textPreview}...`);
      }
    }
  });
}

/**
 * Main content script class for Facebook post logging
 */
class ClarityContentScript {
  private observer: MutationObserver | null = null;
  private isInitialized = false;
  private scanTimeout: ReturnType<typeof setTimeout> | null = null;
  private mutationCount = 0;

  constructor() {
    this.init();
  }

  private init(): void {
    console.log('[Clarity] 🚀 Initializing...');

    if (this.isInitialized) {
      console.log('[Clarity] ⚠️ Already initialized');
      return;
    }

    // Start observing DOM changes
    this.startObserver();

    // Initial scan after page loads
    setTimeout(() => {
      console.log('[Clarity] 🔍 Running initial post scan...');
      scanAndLogPosts();
    }, 3000);

    // Also scan periodically for lazy-loaded content
    setInterval(() => {
      const feedContainer = findFeedPostsContainer();
      const currentPostCount = feedContainer ? feedContainer.children.length : 0;
      if (currentPostCount > loggedPosts.size) {
        console.log(`[Clarity] ⏰ Periodic scan: ${currentPostCount} posts in container vs ${loggedPosts.size} logged`);
        scanAndLogPosts();
      }
    }, 3000);

    this.isInitialized = true;
    console.log('[Clarity] ✅ Initialized successfully');
  }

  private startObserver(): void {
    if (this.observer) return;

    console.log('[Clarity] 🔄 Starting MutationObserver...');

    this.observer = new MutationObserver((mutations) => {
      this.mutationCount += mutations.length;

      let hasNewContent = false;
      let addedCount = 0;

      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            addedCount++;
            const el = node as Element;
            // Check if this is a div being added (potential post)
            // Also check if parent is inside a feed container structure
            if (el.tagName === 'DIV' || el.matches?.('[role="article"]') || el.querySelector?.('[role="article"]')) {
              hasNewContent = true;
            }
          }
        });
      }

      // Trigger scan if new div elements were added (could be new posts)
      if (hasNewContent && addedCount > 0) {
        if (this.scanTimeout) clearTimeout(this.scanTimeout);
        this.scanTimeout = setTimeout(scanAndLogPosts, 1000);
      }
    });

    // Observe entire document body
    if (document.body) {
      this.observer.observe(document.body, OBSERVER_CONFIG);
      console.log('[Clarity] ✅ Observer attached to document.body');
    } else {
      const waitForBody = setInterval(() => {
        if (document.body) {
          this.observer?.observe(document.body, OBSERVER_CONFIG);
          console.log('[Clarity] ✅ Observer attached to document.body');
          clearInterval(waitForBody);
        }
      }, 100);
    }
  }

  public getStats() {
    return {
      totalLogged: loggedPosts.size,
      currentPosts: document.querySelectorAll('[role="article"], [data-pagelet^="FeedUnit"]').length,
    };
  }

  public rescan(): void {
    console.log('[Clarity] 🔄 Manual rescan triggered');
    scanAndLogPosts();
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

console.log('[Clarity] 💡 Tip: Run clarityScript.rescan() in console to manually scan posts');
