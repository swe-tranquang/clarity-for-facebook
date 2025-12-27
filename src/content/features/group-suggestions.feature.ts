import type { FeatureKey, FeatureContext } from '@/types';
import { BaseFeature } from './base.feature';

/**
 * Feature to remove group suggestion posts from the feed
 * Detects posts with source === 'group_suggestion' and hides them
 */
export class GroupSuggestionsFeature extends BaseFeature {
  readonly key: FeatureKey = 'removeGroupSuggestions';
  readonly name = 'Remove Group Suggestions';

  shouldProcess(context: FeatureContext): boolean {
    return context.parsedPost.source === 'group_suggestion';
  }

  process(context: FeatureContext): void {
    const el = context.postElement as HTMLElement;

    // Use display:none instead of remove() to prevent layout shift
    el.style.display = 'none';

    console.log('[Clarity] 👥 Hidden group suggestion post');
  }
}
