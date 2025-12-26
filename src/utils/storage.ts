import browser from 'webextension-polyfill';
import type { ExtensionSettings, ExportData } from '@/types';
import { DEFAULT_SETTINGS, STORAGE_KEYS, EXTENSION_VERSION } from '@/constants';

/**
 * Storage service for managing extension settings
 * Uses browser.storage.sync to sync across devices
 */
export class StorageService {
  /**
   * Get all settings from storage
   */
  static async getSettings(): Promise<ExtensionSettings> {
    try {
      const result = await browser.storage.sync.get(STORAGE_KEYS.SETTINGS);
      const settings = result[STORAGE_KEYS.SETTINGS] as ExtensionSettings | undefined;
      
      if (!settings) {
        // First time usage, save default settings
        await this.saveSettings(DEFAULT_SETTINGS);
        return DEFAULT_SETTINGS;
      }
      
      // Merge with defaults to handle new features
      return { ...DEFAULT_SETTINGS, ...settings };
    } catch (error) {
      console.error('Failed to get settings:', error);
      return DEFAULT_SETTINGS;
    }
  }

  /**
   * Save settings to storage
   */
  static async saveSettings(settings: ExtensionSettings): Promise<void> {
    try {
      const updatedSettings: ExtensionSettings = {
        ...settings,
        lastUpdated: Date.now(),
      };
      
      await browser.storage.sync.set({
        [STORAGE_KEYS.SETTINGS]: updatedSettings,
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  }

  /**
   * Update specific setting
   */
  static async updateSetting<K extends keyof ExtensionSettings>(
    key: K,
    value: ExtensionSettings[K]
  ): Promise<void> {
    const settings = await this.getSettings();
    settings[key] = value;
    await this.saveSettings(settings);
  }

  /**
   * Reset settings to default
   */
  static async resetSettings(): Promise<void> {
    await this.saveSettings(DEFAULT_SETTINGS);
  }

  /**
   * Export settings to JSON
   */
  static async exportSettings(): Promise<ExportData> {
    const settings = await this.getSettings();
    return {
      version: EXTENSION_VERSION,
      exportDate: Date.now(),
      settings,
    };
  }

  /**
   * Import settings from JSON
   */
  static async importSettings(data: ExportData): Promise<void> {
    if (!data.settings) {
      throw new Error('Invalid export data');
    }
    
    // Validate data structure
    const validatedSettings: ExtensionSettings = {
      ...DEFAULT_SETTINGS,
      ...data.settings,
    };
    
    await this.saveSettings(validatedSettings);
  }

  /**
   * Listen to storage changes
   */
  static addChangeListener(
    callback: (settings: ExtensionSettings) => void
  ): void {
    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync' && changes[STORAGE_KEYS.SETTINGS]) {
        const newSettings = changes[STORAGE_KEYS.SETTINGS].newValue as ExtensionSettings;
        callback(newSettings);
      }
    });
  }
}

