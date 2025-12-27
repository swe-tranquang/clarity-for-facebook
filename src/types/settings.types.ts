/**
 * Feature identifiers for Facebook content filtering
 */
export type FeatureKey =
  | 'cleanMode'
  | 'removeStories'
  | 'removeReels'
  | 'removeSponsored'
  | 'removeSuggested'
  | 'removeMarketplace'
  | 'removeSearchAds'
  | 'removeFollowSuggestions'
  | 'removePeopleYouMayKnow';

/**
 * Feature configuration with metadata
 */
export interface Feature {
  key: FeatureKey;
  label: string;
  description: string;
  enabled: boolean;
}

/**
 * User settings stored in browser storage
 */
export interface ExtensionSettings {
  cleanMode: boolean;
  removeStories: boolean;
  removeReels: boolean;
  removeSponsored: boolean;
  removeSuggested: boolean;
  removeMarketplace: boolean;
  removeSearchAds: boolean;
  removeFollowSuggestions: boolean;
  removePeopleYouMayKnow: boolean;
  lastUpdated: number;
}

/**
 * Message types for communication between components
 */
export enum MessageType {
  SETTINGS_UPDATED = 'SETTINGS_UPDATED',
  GET_SETTINGS = 'GET_SETTINGS',
  EXPORT_SETTINGS = 'EXPORT_SETTINGS',
  IMPORT_SETTINGS = 'IMPORT_SETTINGS',
  RESET_SETTINGS = 'RESET_SETTINGS',
}

/**
 * Message structure for extension communication
 */
export interface ExtensionMessage<T = unknown> {
  type: MessageType;
  payload?: T;
}

/**
 * Statistics for monitoring extension performance
 */
export interface FilterStats {
  reelsRemoved: number;
  sponsoredRemoved: number;
  suggestedRemoved: number;
  totalRemoved: number;
  lastReset: number;
}

/**
 * Export/Import data structure
 */
export interface ExportData {
  version: string;
  exportDate: number;
  settings: ExtensionSettings;
}
