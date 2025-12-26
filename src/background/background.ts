import browser from 'webextension-polyfill';
import { StorageService } from '@/utils/storage';
import { MessageType } from '@/types';

/**
 * Background service worker for the extension
 * Handles installation, updates, and cross-component communication
 */
class BackgroundService {
  constructor() {
    this.init();
  }

  /**
   * Initialize background service
   */
  private init(): void {
    // Handle extension installation
    browser.runtime.onInstalled.addListener(this.handleInstalled.bind(this));

    // Handle messages from content scripts and popup
    browser.runtime.onMessage.addListener(this.handleMessage.bind(this));

    // Handle storage changes
    browser.storage.onChanged.addListener(this.handleStorageChange.bind(this));

    console.log('Clarity for Facebook: Background service initialized');
  }

  /**
   * Handle extension installation or update
   */
  private async handleInstalled(
    details: browser.Runtime.OnInstalledDetailsType
  ): Promise<void> {
    if (details.reason === 'install') {
      console.log('Clarity for Facebook: Extension installed');

      // Initialize default settings
      await StorageService.resetSettings();

      // Open welcome page
      await browser.tabs.create({
        url: 'https://github.com/swe-tranquang/clarity-for-facebook',
      });
    } else if (details.reason === 'update') {
      console.log('Clarity for Facebook: Extension updated');

      // Reload all Facebook tabs to apply updates
      const tabs = await browser.tabs.query({
        url: ['*://*.facebook.com/*', '*://*.fb.com/*'],
      });

      for (const tab of tabs) {
        if (tab.id) {
          browser.tabs.reload(tab.id);
        }
      }
    }
  }

  /**
   * Handle messages from other components
   */
  private handleMessage(
    message: { type: MessageType; payload?: unknown },
    sender: browser.Runtime.MessageSender
  ): Promise<unknown> | void {
    console.log('Background received message:', message.type);

    switch (message.type) {
      case MessageType.GET_SETTINGS:
        return StorageService.getSettings();

      case MessageType.EXPORT_SETTINGS:
        return StorageService.exportSettings();

      case MessageType.IMPORT_SETTINGS:
        if (message.payload) {
          return StorageService.importSettings(message.payload as never);
        }
        break;

      case MessageType.RESET_SETTINGS:
        return StorageService.resetSettings();

      default:
        console.warn('Unknown message type:', message.type);
    }
  }

  /**
   * Handle storage changes and notify content scripts
   */
  private async handleStorageChange(
    changes: { [key: string]: browser.Storage.StorageChange },
    areaName: string
  ): Promise<void> {
    if (areaName === 'sync') {
      console.log('Settings changed, notifying content scripts');

      // Notify all Facebook tabs about settings change
      const tabs = await browser.tabs.query({
        url: ['*://*.facebook.com/*', '*://*.fb.com/*'],
      });

      for (const tab of tabs) {
        if (tab.id) {
          try {
            await browser.tabs.sendMessage(tab.id, {
              type: MessageType.SETTINGS_UPDATED,
              payload: changes,
            });
          } catch (error) {
            // Tab might not have content script injected yet
            console.warn('Could not notify tab:', tab.id, error);
          }
        }
      }
    }
  }
}

// Initialize background service
new BackgroundService();
