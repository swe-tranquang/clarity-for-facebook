import type { FeatureKey, FeatureContext } from '@/types';
import { BaseFeature } from './base.feature';

/**
 * Feature to remove suggested posts from the feed
 * Detects posts with source === 'suggested' and hides them
 */
export class SuggestedPostsFeature extends BaseFeature {
  readonly key: FeatureKey = 'removeSuggested';
  readonly name = 'Remove Suggested Posts';

  shouldProcess(context: FeatureContext): boolean {
    return context.parsedPost.source === 'suggested';
  }

  process(context: FeatureContext): void {
    const el = context.postElement as HTMLElement;
    el.style.display = 'none';
  }
}
