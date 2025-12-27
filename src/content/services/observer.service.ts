import { OBSERVER_CONFIG } from '@/constants';

/**
 * MutationObserver service for detecting DOM changes
 */
export class ObserverService {
  private observer: MutationObserver | null = null;
  private scanTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * Start observing DOM changes
   */
  start(onNewContent: () => void): void {
    if (this.observer) {
      console.log('[Clarity] ⚠️ Observer already running');
      return;
    }

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
        // Debounce the callback - use short delay for faster processing
        if (this.scanTimeout) {
          clearTimeout(this.scanTimeout);
        }
        this.scanTimeout = setTimeout(onNewContent, 100);
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
      }, 100);
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

    if (this.scanTimeout) {
      clearTimeout(this.scanTimeout);
      this.scanTimeout = null;
    }
  }
}
