import type { FeatureKey } from '@/types';
import type { FeatureContext } from '../types';
import { BaseFeature } from './base.feature';

/**
 * Feature to remove Reels from the feed
 * TODO: Implement actual detection logic for Reels
 */
export class ReelsFeature extends BaseFeature {
  readonly key: FeatureKey = 'removeReels';
  readonly name = 'Remove Reels';

  shouldProcess(_context: FeatureContext): boolean {
    // TODO: Implement actual detection logic
    // Reels typically have specific selectors or attributes
    return false;
  }

  process(context: FeatureContext): void {
    console.log(`[Clarity] 🎬 Would remove Reels from: ${context.parsedPost.author || 'Unknown'}`);
  }
}
