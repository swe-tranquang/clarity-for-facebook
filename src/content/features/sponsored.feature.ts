import type { FeatureKey, FeatureContext } from '@/types';
import { BaseFeature } from './base.feature';

/**
 * Feature to remove sponsored posts from the feed
 * Detects posts with source === 'sponsored' and hides them
 */
export class SponsoredPostsFeature extends BaseFeature {
  readonly key: FeatureKey = 'removeSponsored';
  readonly name = 'Remove Sponsored Posts';

  shouldProcess(context: FeatureContext): boolean {
    return context.parsedPost.source === 'sponsored';
  }

  process(context: FeatureContext): void {
    const el = context.postElement as HTMLElement;
    el.style.display = 'none';
  }
}
