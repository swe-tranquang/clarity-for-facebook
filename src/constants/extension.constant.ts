import type { ExtensionSettings, Feature } from '@/types';

/**
 * Extension version
 */
export const EXTENSION_VERSION = '1.0.0';

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
  SETTINGS: 'clarity_settings',
  STATS: 'clarity_stats',
} as const;

/**
 * Default settings for the extension
 */
export const DEFAULT_SETTINGS: ExtensionSettings = {
  cleanMode: false,
  removeReels: true,
  removeSponsored: true,
  removeSuggested: true,
  removeMarketplace: true,
  removeSearchAds: true,
  removeFollowSuggestions: true,
  removePeopleYouMayKnow: true,
  lastUpdated: Date.now(),
};

/**
 * Feature configurations with metadata
 */
export const FEATURES: Feature[] = [
  {
    key: 'cleanMode',
    label: 'Clean Mode',
    icon: '✅',
    description: 'Enable/disable all filtering features at once',
    enabled: false,
  },
  {
    key: 'removeReels',
    label: 'Remove Reels',
    icon: '🎬',
    description: 'Hide all Reels from your feed',
    enabled: true,
  },
  {
    key: 'removeSponsored',
    label: 'Remove Sponsored Posts',
    icon: '💰',
    description: 'Hide all sponsored and promoted content',
    enabled: true,
  },
  {
    key: 'removeSuggested',
    label: 'Remove Suggested Posts',
    icon: '👥',
    description: 'Hide "Suggested for you" posts',
    enabled: true,
  },
  {
    key: 'removeMarketplace',
    label: 'Remove Marketplace Ads',
    icon: '🏪',
    description: 'Hide Marketplace advertisements',
    enabled: true,
  },
  {
    key: 'removeSearchAds',
    label: 'Remove Search Ads',
    icon: '🔍',
    description: 'Hide sponsored results in search',
    enabled: true,
  },
  {
    key: 'removeFollowSuggestions',
    label: 'Remove Follow Suggestions',
    icon: '➕',
    description: 'Hide "Follow" button suggestions',
    enabled: true,
  },
  {
    key: 'removePeopleYouMayKnow',
    label: 'Remove People You May Know',
    icon: '👤',
    description: 'Hide friend suggestions',
    enabled: true,
  },
];
