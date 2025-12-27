import type { FeatureKey } from '@/types';
import type { FeatureContext } from '../types';
import { BaseFeature } from './base.feature';

/**
 * Feature to remove Stories from the feed
 * TODO: Implement actual detection logic for Stories
 */
export class StoriesFeature extends BaseFeature {
  readonly key: FeatureKey = 'removeStories';
  readonly name = 'Remove Stories';

  shouldProcess(_context: FeatureContext): boolean {
    // TODO: Implement actual detection logic
    // Stories are typically a separate section at the top of the feed
    return false;
  }

  process(context: FeatureContext): void {
    console.log(`[Clarity] 📖 Would remove Stories from: ${context.parsedPost.author || 'Unknown'}`);
  }
}
