/**
 * Debounce function to limit execution rate
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit execution frequency
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if an element contains specific text (case-insensitive, multilingual)
 */
export function containsText(element: Element, texts: string[]): boolean {
  const textContent = element.textContent?.toLowerCase() || '';
  return texts.some((text) => textContent.includes(text.toLowerCase()));
}

/**
 * Check if element or its children match a selector
 */
export function matchesOrContains(element: Element, selector: string): boolean {
  return element.matches(selector) || element.querySelector(selector) !== null;
}

/**
 * Find closest parent matching condition
 */
export function findClosestParent(
  element: Element,
  condition: (el: Element) => boolean,
  maxDepth = 10
): Element | null {
  let current = element.parentElement;
  let depth = 0;

  while (current && depth < maxDepth) {
    if (condition(current)) {
      return current;
    }
    current = current.parentElement;
    depth++;
  }

  return null;
}

/**
 * Hide element with smooth transition
 */
export function hideElement(element: HTMLElement): void {
  element.style.transition = 'opacity 0.3s ease-out, max-height 0.3s ease-out';
  element.style.opacity = '0';
  element.style.maxHeight = '0';
  element.style.overflow = 'hidden';
  element.style.marginTop = '0';
  element.style.marginBottom = '0';
  element.setAttribute('data-clarity-hidden', 'true');
}

/**
 * Show element (undo hiding)
 */
export function showElement(element: HTMLElement): void {
  element.style.transition = '';
  element.style.opacity = '';
  element.style.maxHeight = '';
  element.style.overflow = '';
  element.style.marginTop = '';
  element.style.marginBottom = '';
  element.removeAttribute('data-clarity-hidden');
}

/**
 * Check if element is already hidden by extension
 */
export function isHiddenByExtension(element: Element): boolean {
  return element.getAttribute('data-clarity-hidden') === 'true';
}

/**
 * Download JSON data as file
 */
export function downloadJSON(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Format date for display
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
