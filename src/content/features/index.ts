export * from './base.feature';
export * from './reels.feature';
export * from './stories.feature';
export * from './suggested.feature';
export * from './group-suggestions.feature';
export * from './people-you-may-know.feature';

import { BaseFeature } from './base.feature';
import { ReelsFeature } from './reels.feature';
import { StoriesFeature } from './stories.feature';
import { SuggestedPostsFeature } from './suggested.feature';
import { GroupSuggestionsFeature } from './group-suggestions.feature';
import { PeopleYouMayKnowFeature } from './people-you-may-know.feature';

export const createFeatures = (): BaseFeature[] => [
  new SuggestedPostsFeature(),
  new ReelsFeature(),
  new StoriesFeature(),
  new PeopleYouMayKnowFeature(),
  new GroupSuggestionsFeature(),
];
