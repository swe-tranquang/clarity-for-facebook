import type { ExtensionSettings, Feature } from '@/types';

export const EXTENSION_VERSION = '1.0.0';

export const STORAGE_KEYS = {
  SETTINGS: 'clarity_settings',
  STATS: 'clarity_stats',
} as const;

export const DEFAULT_SETTINGS: ExtensionSettings = {
  cleanMode: false,
  removeStories: true,
  removeReels: true,
  removeSponsored: true,
  removeSuggested: true,
  removeMarketplace: true,
  removeSearchAds: true,
  removePeopleYouMayKnow: true,
  removeGroupSuggestions: true,
  lastUpdated: Date.now(),
};

export const FEATURES: Feature[] = [
  {
    key: 'cleanMode',
    label: 'Clean Mode',
    description: 'Enable/disable all filtering features at once',
    enabled: false,
  },
  {
    key: 'removeStories',
    label: 'Remove Stories',
    description: 'Hide all stories from your feed',
    enabled: true,
  },
  {
    key: 'removeReels',
    label: 'Remove Reels',
    description: 'Hide all Reels from your feed',
    enabled: true,
  },
  {
    key: 'removeSponsored',
    label: 'Remove Sponsored Posts',
    description: 'Hide all sponsored and promoted content',
    enabled: true,
  },
  {
    key: 'removeSuggested',
    label: 'Remove Suggested Posts',
    description: 'Hide "Suggested for you" posts',
    enabled: true,
  },
  {
    key: 'removeMarketplace',
    label: 'Remove Marketplace Ads',
    description: 'Hide Marketplace advertisements',
    enabled: true,
  },
  {
    key: 'removeSearchAds',
    label: 'Remove Search Ads',
    description: 'Hide sponsored results in search',
    enabled: true,
  },
  {
    key: 'removePeopleYouMayKnow',
    label: 'Remove People You May Know',
    description: 'Hide friend suggestions',
    enabled: true,
  },
  {
    key: 'removeGroupSuggestions',
    label: 'Remove Group Suggestions',
    description: 'Hide group suggestions',
    enabled: true,
  },
];
