export type FeatureKey =
  | 'cleanMode'
  | 'removeStories'
  | 'removeReels'
  | 'removeSponsored'
  | 'removeSuggested'
  | 'removeMarketplace'
  | 'removeSearchAds'
  | 'removePeopleYouMayKnow'
  | 'removeGroupSuggestions';

export interface Feature {
  key: FeatureKey;
  label: string;
  description: string;
  enabled: boolean;
}

export interface ExtensionSettings {
  cleanMode: boolean;
  removeStories: boolean;
  removeReels: boolean;
  removeSponsored: boolean;
  removeSuggested: boolean;
  removeMarketplace: boolean;
  removeSearchAds: boolean;
  removePeopleYouMayKnow: boolean;
  removeGroupSuggestions: boolean;
  lastUpdated: number;
}

export enum MessageType {
  SETTINGS_UPDATED = 'SETTINGS_UPDATED',
  GET_SETTINGS = 'GET_SETTINGS',
  EXPORT_SETTINGS = 'EXPORT_SETTINGS',
  IMPORT_SETTINGS = 'IMPORT_SETTINGS',
  RESET_SETTINGS = 'RESET_SETTINGS',
}

export interface ExtensionMessage<T = unknown> {
  type: MessageType;
  payload?: T;
}

export interface FilterStats {
  reelsRemoved: number;
  sponsoredRemoved: number;
  suggestedRemoved: number;
  totalRemoved: number;
  lastReset: number;
}

export interface ExportData {
  version: string;
  exportDate: number;
  settings: ExtensionSettings;
}
