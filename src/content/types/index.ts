import type { ParsedPost } from '@/types';

/**
 * Context passed to features for processing
 */
export interface FeatureContext {
  postElement: Element;
  parsedPost: ParsedPost;
}
