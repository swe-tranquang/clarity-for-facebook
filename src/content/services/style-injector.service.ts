/**
 * Service to manage post visibility
 * Uses CSS classes with smooth transitions
 */
export class StyleInjectorService {
  /**
   * Initialize the service
   */
  init(): void {
    console.log('[Clarity] 💉 Style injector initialized');
  }

  /**
   * Update which content types should be hidden (for future use)
   */
  updateHiddenTypes(hideSuggested: boolean, hideSponsored: boolean): void {
    console.log('[Clarity] 🎨 Hidden types - suggested:', hideSuggested, 'sponsored:', hideSponsored);
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
