import type { FeatureKey } from '@/types';
import type { FeatureContext } from '../types';
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
    const author = context.parsedPost.author || 'Unknown';
    const el = context.postElement as HTMLElement;

    // Use display:none instead of remove() to prevent layout shift
    el.style.display = 'none';

    console.log(`[Clarity] 🎬 Hidden Reels post from: ${author}`);
  }
}
