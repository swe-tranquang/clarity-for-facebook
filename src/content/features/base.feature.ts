import type { FeatureKey, FeatureContext } from '@/types';

/**
 * Base class for all content filtering features
 * Uses Template Method pattern for consistent feature execution
 */
export abstract class BaseFeature {
  abstract readonly key: FeatureKey;
  abstract readonly name: string;

  protected enabled: boolean = false;

  /**
   * Set feature enabled state
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    console.log(`[Clarity] ${this.name}: ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Check if feature is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Determine if this feature should process the given context
   */
  abstract shouldProcess(context: FeatureContext): boolean;

  /**
   * Process the element (e.g., remove, hide, modify)
   */
  abstract process(context: FeatureContext): void;

  /**
   * Execute the feature on the given context
   * @returns true if the feature processed the element, false otherwise
   */
  execute(context: FeatureContext): boolean {
    if (!this.enabled) {
      return false;
    }

    if (!this.shouldProcess(context)) {
      return false;
    }

    this.process(context);
    return true;
  }
}
