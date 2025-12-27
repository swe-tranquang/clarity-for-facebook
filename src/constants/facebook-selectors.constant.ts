/**
 * Multi-language constants for Facebook selectors
 * These cover different language regions
 */

/**
 * Feed header text variations across different languages
 */
export const FEED_HEADER_TEXTS = [
  // English
  'feed posts',
  'feeds',
  // Vietnamese
  'bài viết',
  'bảng tin',
  // Chinese (Simplified)
  '动态',
  '帖子',
  // Chinese (Traditional)
  '動態',
  '貼文',
  // Japanese
  'フィード',
  '投稿',
  // Korean
  '피드',
  '게시물',
  // Spanish
  'publicaciones',
  'noticias',
  // French
  'publications',
  "fil d'actualité",
  // German
  'beiträge',
  'news feed',
  // Portuguese
  'publicações',
  'feed de notícias',
  // Thai
  'โพสต์',
  'ฟีด',
  // Indonesian
  'postingan',
  'beranda',
];

/**
 * Follow button text variations (indicates suggested posts)
 */
export const FOLLOW_BUTTON_TEXTS = [
  // English
  'follow',
  // Vietnamese
  'theo dõi',
  // Chinese (Simplified)
  '关注',
  // Chinese (Traditional)
  '追蹤',
  // Japanese
  'フォロー',
  // Korean
  '팔로우',
  // Spanish
  'seguir',
  // French
  'suivre',
  // German
  'folgen',
  // Portuguese
  'seguir',
  // Thai
  'ติดตาม',
  // Indonesian
  'ikuti',
];

/**
 * Sponsored post indicators
 */
export const SPONSORED_TEXTS = [
  // English
  'sponsored',
  // Vietnamese
  'được tài trợ',
  // Chinese (Simplified)
  '赞助内容',
  '广告',
  // Chinese (Traditional)
  '贊助',
  '廣告',
  // Japanese
  '広告',
  'スポンサー',
  // Korean
  '광고',
  '스폰서',
  // Spanish
  'publicidad',
  'patrocinado',
  // French
  'sponsorisé',
  'publicité',
  // German
  'gesponsert',
  'werbung',
  // Portuguese
  'patrocinado',
  // Thai
  'โฆษณา',
  // Indonesian
  'bersponsor',
];

/**
 * "Suggested for you" text variations (indicates suggested posts)
 */
export const SUGGESTED_FOR_YOU_TEXTS = [
  // English
  'suggested for you',
  'your group suggestions',
  // Vietnamese
  'gợi ý cho bạn',
  'đề xuất cho bạn',
  'gợi ý nhóm cho bạn',
  // Chinese (Simplified)
  '为你推荐',
  '推荐给你',
  '你的群组推荐',
  // Chinese (Traditional)
  '為你推薦',
  '推薦給你',
  '你的社團推薦',
  // Japanese
  'おすすめ',
  'あなたへのおすすめ',
  'おすすめのグループ',
  // Korean
  '회원님을 위한 추천',
  '추천',
  '그룹 추천',
  // Spanish
  'sugerido para ti',
  'sugerencias para ti',
  'sugerencias de grupos',
  // French
  'suggestions pour vous',
  'suggéré pour vous',
  'suggestions de groupes',
  // German
  'vorschläge für dich',
  'für dich vorgeschlagen',
  'gruppenvorschläge',
  // Portuguese
  'sugestão para você',
  'sugerido para você',
  'sugestões de grupos',
  // Thai
  'แนะนำสำหรับคุณ',
  'กลุ่มแนะนำของคุณ',
  // Indonesian
  'disarankan untuk anda',
  'saran untuk anda',
  'saran grup anda',
];

/**
 * Check if text matches any of the provided patterns (case-insensitive)
 */
export function matchesAny(text: string | null | undefined, patterns: string[]): boolean {
  if (!text) return false;
  const lowerText = text.toLowerCase().trim();
  return patterns.some((pattern) => lowerText.includes(pattern.toLowerCase()));
}

/**
 * Check if text exactly matches any of the provided patterns (case-insensitive)
 */
export function matchesExact(text: string | null | undefined, patterns: string[]): boolean {
  if (!text) return false;
  const lowerText = text.toLowerCase().trim();
  return patterns.some((pattern) => lowerText === pattern.toLowerCase());
}
