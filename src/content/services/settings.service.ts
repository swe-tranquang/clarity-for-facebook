import browser from 'webextension-polyfill';
import type { ExtensionSettings } from '@/types';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '@/constants';

export class SettingsService {
  private settings: ExtensionSettings = DEFAULT_SETTINGS;
  private listeners: ((settings: ExtensionSettings) => void)[] = [];

  async loadSettings(): Promise<ExtensionSettings> {
    try {
      const result = await browser.storage.sync.get(STORAGE_KEYS.SETTINGS);
      const settings = result[STORAGE_KEYS.SETTINGS] as ExtensionSettings | undefined;

      if (settings) {
        this.settings = { ...DEFAULT_SETTINGS, ...settings };
      } else {
        this.settings = DEFAULT_SETTINGS;
      }

      return this.settings;
    } catch (error) {
      return DEFAULT_SETTINGS;
    }
  }

  getSettings(): ExtensionSettings {
    return this.settings;
  }

  onSettingsChange(callback: (settings: ExtensionSettings) => void): void {
    this.listeners.push(callback);
  }

  startListening(): void {
    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync' && changes[STORAGE_KEYS.SETTINGS]) {
        const newSettings = changes[STORAGE_KEYS.SETTINGS].newValue as ExtensionSettings;
        this.settings = { ...DEFAULT_SETTINGS, ...newSettings };

        for (const listener of this.listeners) {
          listener(this.settings);
        }
      }
    });
  }
}
