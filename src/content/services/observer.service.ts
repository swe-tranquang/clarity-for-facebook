import { OBSERVER_CONFIG } from '@/constants';

/**
 * MutationObserver service for detecting DOM changes
 * Uses fast processing without pre-hide (to avoid breaking feed)
 */
export class ObserverService {
  private observer: MutationObserver | null = null;
  private processCallback: (() => void) | null = null;
  private frameRequested = false;

  /**
   * Start observing DOM changes
   */
  start(onNewContent: () => void): void {
    if (this.observer) {
      console.log('[Clarity] ⚠️ Observer already running');
      return;
    }

    this.processCallback = onNewContent;
    console.log('[Clarity] 🔄 Starting MutationObserver...');

    this.observer = new MutationObserver((mutations) => {
      let hasNewContent = false;

      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            if (el.tagName === 'DIV' || el.matches?.('[role="article"]') || el.querySelector?.('[role="article"]')) {
              hasNewContent = true;
              break;
            }
          }
        }
        if (hasNewContent) break;
      }

      if (hasNewContent) {
        // Process immediately using requestAnimationFrame (faster than setTimeout)
        if (!this.frameRequested) {
          this.frameRequested = true;
          requestAnimationFrame(() => {
            this.frameRequested = false;
            this.processCallback?.();
          });
        }
      }
    });

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
      }, 10);
    }
  }

  /**
   * Stop observing DOM changes
   */
  stop(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
      console.log('[Clarity] 🛑 Observer stopped');
    }
    this.processCallback = null;
    this.frameRequested = false;
  }
}
