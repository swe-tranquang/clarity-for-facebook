import browser from 'webextension-polyfill';
import type { ExtensionSettings } from '@/types';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '@/constants';

/**
 * Settings service for content script
 * Manages settings loading and change listening
 */
export class SettingsService {
  private settings: ExtensionSettings = DEFAULT_SETTINGS;
  private listeners: ((settings: ExtensionSettings) => void)[] = [];

  /**
   * Load settings from storage
   */
  async loadSettings(): Promise<ExtensionSettings> {
    try {
      const result = await browser.storage.sync.get(STORAGE_KEYS.SETTINGS);
      const settings = result[STORAGE_KEYS.SETTINGS] as ExtensionSettings | undefined;

      if (settings) {
        this.settings = { ...DEFAULT_SETTINGS, ...settings };
      } else {
        this.settings = DEFAULT_SETTINGS;
      }

      console.log('[Clarity] ⚙️ Settings loaded:', this.settings);
      return this.settings;
    } catch (error) {
      console.error('[Clarity] ❌ Failed to load settings:', error);
      return DEFAULT_SETTINGS;
    }
  }

  /**
   * Get current settings (cached)
   */
  getSettings(): ExtensionSettings {
    return this.settings;
  }

  /**
   * Register a callback for settings changes
   */
  onSettingsChange(callback: (settings: ExtensionSettings) => void): void {
    this.listeners.push(callback);
  }

  /**
   * Start listening for storage changes
   */
  startListening(): void {
    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync' && changes[STORAGE_KEYS.SETTINGS]) {
        const newSettings = changes[STORAGE_KEYS.SETTINGS].newValue as ExtensionSettings;
        this.settings = { ...DEFAULT_SETTINGS, ...newSettings };

        console.log('[Clarity] 🔄 Settings updated:', this.settings);

        // Notify all listeners
        for (const listener of this.listeners) {
          listener(this.settings);
        }
      }
    });

    console.log('[Clarity] 👂 Settings change listener started');
  }
}
