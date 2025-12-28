import { STORIES_ARIA_LABELS } from '@/constants';

export class StyleInjectorService {
  private storiesStyleElement: HTMLStyleElement | null = null;

  init(): void {
    console.log('[Clarity] 💉 Style injector initialized');
  }

  updateHiddenTypes(hideSuggested: boolean, hideSponsored: boolean, hideStories: boolean = false): void {
    console.log('[Clarity] 🎨 Hidden types - suggested:', hideSuggested, 'sponsored:', hideSponsored, 'stories:', hideStories);
    this.updateStoriesVisibility(hideStories);
  }

  private updateStoriesVisibility(hide: boolean): void {
    if (hide) {
      if (!this.storiesStyleElement) {
        this.storiesStyleElement = document.createElement('style');
        this.storiesStyleElement.id = 'clarity-stories-style';
        document.head.appendChild(this.storiesStyleElement);
      }
      
      const selectors = STORIES_ARIA_LABELS.map((label: string) => `[aria-label="${label}"]`).join(', ');
      this.storiesStyleElement.textContent = `${selectors} { display: none !important; }`;
    } else {
      if (this.storiesStyleElement) {
        this.storiesStyleElement.textContent = '';
      }
    }
  }

  markAsApproved(element: Element): void {
    element.classList.add('clarity-approved');
    element.classList.remove('clarity-hidden');
    (element as HTMLElement).removeAttribute('data-clarity-removed');
  }

  markAsHidden(element: Element): void {
    element.classList.remove('clarity-approved');
    element.classList.add('clarity-hidden');

    setTimeout(() => {
      (element as HTMLElement).dataset.clarityRemoved = 'true';
    }, 150);
  }
}
