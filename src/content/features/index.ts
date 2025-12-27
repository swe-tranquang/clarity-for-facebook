export * from './base.feature';
export * from './suggested.feature';
export * from './reels.feature';
export * from './stories.feature';

import { BaseFeature } from './base.feature';
import { SuggestedPostsFeature } from './suggested.feature';
import { ReelsFeature } from './reels.feature';
import { StoriesFeature } from './stories.feature';

/**
 * Create all feature instances
 * Add new features here when implementing
 */
export const createFeatures = (): BaseFeature[] => [new SuggestedPostsFeature(), new ReelsFeature(), new StoriesFeature()];
