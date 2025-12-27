/**
 * Source of the post in Facebook feed
 */
export type PostSource = 'following' | 'suggested' | 'sponsored' | 'reels';

/**
 * Interface for parsed Facebook post data
 */
export interface ParsedPost {
  author: string | null;
  content: string | null;
  postLink: string | null;
  images: string[];
  reactions: {
    total: string;
    like: string;
    love: string;
  };
  comments: string;
  shares: string;
  source: PostSource;
}
