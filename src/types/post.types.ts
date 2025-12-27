export type PostSource = 'following' | 'suggested' | 'sponsored' | 'reels' | 'people_suggestion' | 'group_suggestion';

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
