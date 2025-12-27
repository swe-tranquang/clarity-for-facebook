import type { FeatureKey, FeatureContext } from '@/types';
import { BaseFeature } from './base.feature';

/**
 * Feature to remove "People you may know" posts from the feed
 * Detects posts with source === 'people_suggestion' and hides them
 */
export class PeopleYouMayKnowFeature extends BaseFeature {
  readonly key: FeatureKey = 'removePeopleYouMayKnow';
  readonly name = 'Remove People You May Know';

  shouldProcess(context: FeatureContext): boolean {
    return context.parsedPost.source === 'people_suggestion';
  }

  process(context: FeatureContext): void {
    const el = context.postElement as HTMLElement;

    // Use display:none instead of remove() to prevent layout shift
    el.style.display = 'none';

    console.log('[Clarity] 👥 Hidden "People you may know" post');
  }
}
