/**
 * Service to manage post visibility
 * Uses CSS classes with smooth transitions
 */
export class StyleInjectorService {
  private storiesStyleElement: HTMLStyleElement | null = null;

  /**
   * Initialize the service
   */
  init(): void {
    console.log('[Clarity] 💉 Style injector initialized');
  }

  /**
   * Update which content types should be hidden
   */
  updateHiddenTypes(hideSuggested: boolean, hideSponsored: boolean, hideStories: boolean = false): void {
    console.log('[Clarity] 🎨 Hidden types - suggested:', hideSuggested, 'sponsored:', hideSponsored, 'stories:', hideStories);
    this.updateStoriesVisibility(hideStories);
  }

  /**
   * Update Stories visibility via dynamic CSS injection
   */
  private updateStoriesVisibility(hide: boolean): void {
    if (hide) {
      // Inject CSS to hide Stories
      if (!this.storiesStyleElement) {
        this.storiesStyleElement = document.createElement('style');
        this.storiesStyleElement.id = 'clarity-stories-style';
        document.head.appendChild(this.storiesStyleElement);
      }
      this.storiesStyleElement.textContent = '[aria-label="Stories"] { display: none !important; }';
      console.log('[Clarity] 📖 Stories hidden via CSS');
    } else {
      // Remove CSS to show Stories
      if (this.storiesStyleElement) {
        this.storiesStyleElement.textContent = '';
        console.log('[Clarity] 📖 Stories visible');
      }
    }
  }

  /**
   * Mark an element as approved (show it)
   */
  markAsApproved(element: Element): void {
    element.classList.add('clarity-approved');
    element.classList.remove('clarity-hidden');
    (element as HTMLElement).removeAttribute('data-clarity-removed');
  }

  /**
   * Mark an element as hidden with smooth animation
   */
  markAsHidden(element: Element): void {
    element.classList.remove('clarity-approved');
    element.classList.add('clarity-hidden');

    // After CSS transition completes, fully remove from layout
    setTimeout(() => {
      (element as HTMLElement).dataset.clarityRemoved = 'true';
    }, 150);
  }
}
