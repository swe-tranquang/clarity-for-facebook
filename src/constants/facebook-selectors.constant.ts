export const FEED_HEADER_TEXTS = [
  'feed',
  // English
  'feed posts',
  // Vietnamese
  'bài viết trên bảng feed',
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
  'publicaciones del feed',
  'publicaciones',
  'noticias',
  // French
  'publications',
  "fil d'actualité",
  // German
  'beiträge',
  'news feed',
  // Portuguese
  'publicações do feed',
  'publicações',
  'feed de notícias',
  // Thai
  'โพสต์',
  'ฟีด',
  // Indonesian
  'postingan',
  'beranda',
];

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

export const SUGGESTED_FOR_YOU_TEXTS = [
  // English
  'suggested for you',
  // Vietnamese
  'gợi ý cho bạn',
  'đề xuất cho bạn',
  // Chinese (Simplified)
  '为你推荐',
  '推荐给你',
  // Chinese (Traditional)
  '為你推薦',
  '推薦給你',
  // Japanese
  'おすすめ',
  'あなたへのおすすめ',
  // Korean
  '회원님을 위한 추천',
  '추천',
  // Spanish
  'sugerido para ti',
  'sugerencias para ti',
  // French
  'suggestions pour vous',
  'suggéré pour vous',
  // German
  'vorschläge für dich',
  'für dich vorgeschlagen',
  // Portuguese
  'sugestão para você',
  'sugerido para você',
  // Thai
  'แนะนำสำหรับคุณ',
  // Indonesian
  'disarankan untuk anda',
  'saran untuk anda',
];

export const GROUP_SUGGESTIONS_TEXTS = [
  // English
  'your group suggestions',
  'suggested groups',
  // Vietnamese
  'gợi ý nhóm cho bạn',
  'nhóm gợi ý',
  // Chinese (Simplified)
  '你的群组推荐',
  '推荐群组',
  // Chinese (Traditional)
  '你的社團推薦',
  '推薦社團',
  // Japanese
  'おすすめのグループ',
  // Korean
  '그룹 추천',
  // Spanish
  'tus sugerencias de grupos',
  'sugerencias de grupos',
  'grupos sugeridos',
  // French
  'suggestions de groupes',
  'groupes suggérés',
  // German
  'gruppenvorschläge',
  // Portuguese
  'as tuas sugestões de grupos',
  'sugestões de grupos',
  'grupos sugeridos',
  // Thai
  'กลุ่มแนะนำของคุณ',
  // Indonesian
  'saran grup anda',
  'grup yang disarankan',
];

export const PEOPLE_YOU_MAY_KNOW_TEXTS = [
  // English
  'people you may know',
  // Vietnamese
  'những người bạn có thể biết',
  'người bạn có thể biết',
  // Chinese (Simplified)
  '你可能认识的人',
  // Chinese (Traditional)
  '你可能認識的朋友',
  // Japanese
  '知り合いかも',
  // Korean
  '알 수도 있는 사람',
  // Spanish
  'personas que quizá conozcas',
  // French
  'personnes que vous connaissez peut-être',
  // German
  'personen, die du kennen könntest',
  // Portuguese
  'pessoas que talvez conheças',
  'pessoas que você talvez conheça',
  // Thai
  'คนที่คุณอาจรู้จัก',
  // Indonesian
  'orang yang mungkin anda kenal',
];

export const STORIES_ARIA_LABELS = [
  // English
  'Stories',
  'stories tray',
  // Vietnamese
  'Tin',
  // Chinese (Simplified)
  '快拍',
  // Chinese (Traditional)
  '限時動態',
  // Japanese
  'ストーリーズ',
  // Korean
  '스토리',
  // Spanish
  'Historias',
  // French
  'Stories',
  // German
  'Storys',
  // Portuguese
  'Histórias',
  // Thai
  'เรื่องราว',
  // Indonesian
  'Cerita',
];

export function matchesAny(text: string | null | undefined, patterns: string[]): boolean {
  if (!text) return false;
  const lowerText = text.toLowerCase().trim();
  return patterns.some((pattern) => lowerText.includes(pattern.toLowerCase()));
}

export function matchesExact(text: string | null | undefined, patterns: string[]): boolean {
  if (!text) return false;
  const lowerText = text.toLowerCase().trim();
  return patterns.some((pattern) => lowerText === pattern.toLowerCase());
}
