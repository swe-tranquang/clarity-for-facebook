import type { FeatureKey, FeatureContext } from '@/types';
import { BaseFeature } from './base.feature';

/**
 * Feature to remove Reels from the feed
 * Detects posts with source === 'reels' and hides them
 */
export class ReelsFeature extends BaseFeature {
  readonly key: FeatureKey = 'removeReels';
  readonly name = 'Remove Reels';

  shouldProcess(context: FeatureContext): boolean {
    return context.parsedPost.source === 'reels';
  }

  process(context: FeatureContext): void {
    const el = context.postElement as HTMLElement;
    el.style.display = 'none';
  }
}
