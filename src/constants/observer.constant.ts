export const PERFORMANCE_CONFIG = {
  OBSERVER_THROTTLE: 300, // ms
  CLEANUP_DEBOUNCE: 500, // ms
  MAX_BATCH_SIZE: 50, // Max elements to process per batch
} as const;

export const OBSERVER_CONFIG: MutationObserverInit = {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false,
};
