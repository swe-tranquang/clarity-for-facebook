import type { FeatureKey, FeatureContext } from '@/types';
import { BaseFeature } from './base.feature';

/**
 * Feature to remove Stories from the feed
 * Stories are hidden via CSS injection in content.css
 * This feature exists for settings toggle support
 */
export class StoriesFeature extends BaseFeature {
  readonly key: FeatureKey = 'removeStories';
  readonly name = 'Remove Stories';

  shouldProcess(_context: FeatureContext): boolean {
    return false;
  }

  process(_context: FeatureContext): void {
    // No-op - Stories are hidden via CSS
  }
}
