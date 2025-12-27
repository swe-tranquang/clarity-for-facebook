import { OBSERVER_CONFIG } from '@/constants';

export class ObserverService {
  private observer: MutationObserver | null = null;
  private processCallback: (() => void) | null = null;
  private frameRequested = false;

  start(onNewContent: () => void): void {
    if (this.observer) {
      return;
    }

    this.processCallback = onNewContent;

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
    } else {
      const waitForBody = setInterval(() => {
        if (document.body) {
          this.observer?.observe(document.body, OBSERVER_CONFIG);
          clearInterval(waitForBody);
        }
      }, 10);
    }
  }

  stop(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.processCallback = null;
    this.frameRequested = false;
  }
}
