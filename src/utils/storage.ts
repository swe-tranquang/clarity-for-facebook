import browser from 'webextension-polyfill';
import type { ExtensionSettings, ExportData } from '@/types';
import { DEFAULT_SETTINGS, STORAGE_KEYS, EXTENSION_VERSION } from '@/constants';

export class StorageService {
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
      const mergedSettings = { ...DEFAULT_SETTINGS, ...settings };
      return mergedSettings;
    } catch (error) {
      console.error('[StorageService] ❌ Failed to get settings:', error);
      return DEFAULT_SETTINGS;
    }
  }

  static async saveSettings(settings: ExtensionSettings): Promise<void> {
    try {
      const updatedSettings: ExtensionSettings = {
        ...settings,
        lastUpdated: Date.now(),
      };

      await browser.storage.sync.set({
        [STORAGE_KEYS.SETTINGS]: updatedSettings,
      });
      await browser.storage.sync.set({
        [STORAGE_KEYS.SETTINGS]: updatedSettings,
      });
    } catch (error) {
      console.error('[StorageService] ❌ Failed to save settings:', error);
      throw error;
    }
  }

  static async updateSetting<K extends keyof ExtensionSettings>(key: K, value: ExtensionSettings[K]): Promise<void> {
    const settings = await this.getSettings();
    settings[key] = value;
    await this.saveSettings(settings);
  }

  static async resetSettings(): Promise<void> {
    await this.saveSettings(DEFAULT_SETTINGS);
  }

  static async exportSettings(): Promise<ExportData> {
    const settings = await this.getSettings();
    return {
      version: EXTENSION_VERSION,
      exportDate: Date.now(),
      settings,
    };
  }

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

  static addChangeListener(callback: (settings: ExtensionSettings) => void): void {
    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync' && changes[STORAGE_KEYS.SETTINGS]) {
        const newSettings = changes[STORAGE_KEYS.SETTINGS].newValue as ExtensionSettings;
        callback(newSettings);
      }
    });
  }
}
