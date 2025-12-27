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
    console.log('[StorageService] 📥 getSettings called');
    try {
      console.log('[StorageService] 🔍 Reading from browser.storage.sync...');
      const result = await browser.storage.sync.get(STORAGE_KEYS.SETTINGS);
      console.log('[StorageService] 📦 Storage result:', result);

      const settings = result[STORAGE_KEYS.SETTINGS] as ExtensionSettings | undefined;
      console.log('[StorageService] ⚙️ Parsed settings:', settings);

      if (!settings) {
        console.log('[StorageService] 🆕 No settings found, using defaults');
        // First time usage, save default settings
        await this.saveSettings(DEFAULT_SETTINGS);
        return DEFAULT_SETTINGS;
      }

      // Merge with defaults to handle new features
      const mergedSettings = { ...DEFAULT_SETTINGS, ...settings };
      console.log('[StorageService] ✅ Returning merged settings:', mergedSettings);
      return mergedSettings;
    } catch (error) {
      console.error('[StorageService] ❌ Failed to get settings:', error);
      console.log('[StorageService] 🔄 Returning default settings');
      return DEFAULT_SETTINGS;
    }
  }

  /**
   * Save settings to storage
   */
  static async saveSettings(settings: ExtensionSettings): Promise<void> {
    console.log('[StorageService] 💾 saveSettings called with:', settings);
    try {
      const updatedSettings: ExtensionSettings = {
        ...settings,
        lastUpdated: Date.now(),
      };
      console.log(
        '[StorageService] ⏰ Updated settings with timestamp:',
        updatedSettings
      );

      console.log('[StorageService] 📝 Writing to browser.storage.sync...');
      await browser.storage.sync.set({
        [STORAGE_KEYS.SETTINGS]: updatedSettings,
      });
      console.log('[StorageService] ✅ Settings saved successfully');
    } catch (error) {
      console.error('[StorageService] ❌ Failed to save settings:', error);
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
  static addChangeListener(callback: (settings: ExtensionSettings) => void): void {
    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync' && changes[STORAGE_KEYS.SETTINGS]) {
        const newSettings = changes[STORAGE_KEYS.SETTINGS].newValue as ExtensionSettings;
        callback(newSettings);
      }
    });
  }
}
