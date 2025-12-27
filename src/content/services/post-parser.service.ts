import { FEED_HEADER_TEXTS, FOLLOW_BUTTON_TEXTS, SPONSORED_TEXTS, matchesAny, matchesExact } from '@/constants';
import type { ParsedPost, PostSource } from '@/types';

/**
 * Service for parsing Facebook posts
 */
export class PostParserService {
  /**
   * Detect the source of a post (following, suggested, or sponsored)
   */
  detectPostSource(postElement: Element): PostSource {
    const allSpans = postElement.querySelectorAll('span');

    // Check for sponsored indicators first
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
  parsePost(postElement: Element): ParsedPost {
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
    const source = this.detectPostSource(postElement);

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
   * Find the feed container by looking for h3 with feed header text
   */
  findFeedContainer(): Element | null {
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
   * Get all post elements from the page
   */
  getAllPosts(): Element[] {
    const feedContainer = this.findFeedContainer();

    if (feedContainer) {
      console.log('[Clarity] 📦 Feed container found, children:', feedContainer.children.length);
      // Filter out empty or very small elements
      return Array.from(feedContainer.children).filter((el) => {
        // Must have some content
        const hasContent = (el.textContent?.length || 0) > 50;
        // Must not be hidden
        const isVisible = el.getAttribute('aria-hidden') !== 'true';
        return hasContent && isVisible;
      });
    }

    console.log('[Clarity] ⚠️ Feed container not found, using article fallback');

    // Fallback: get all articles with stricter filtering
    return Array.from(document.querySelectorAll('[role="article"]')).filter((el) => {
      // Must have reasonable content length (actual posts have more than just nav text)
      const textLength = el.textContent?.length || 0;
      // Filter out small elements and elements with repeated "Facebook" text (navigation)
      const isActualPost = textLength > 200 && !el.textContent?.startsWith('FacebookFacebook');
      return isActualPost;
    });
  }
}
