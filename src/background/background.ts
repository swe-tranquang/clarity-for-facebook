import browser from 'webextension-polyfill';
import { StorageService } from '@/utils/storage';
import { MessageType } from '@/types';

class BackgroundService {
  constructor() {
    this.init();
  }

  private init(): void {
    browser.runtime.onInstalled.addListener(this.handleInstalled.bind(this));
    browser.runtime.onMessage.addListener(this.handleMessage.bind(this));
    browser.storage.onChanged.addListener(this.handleStorageChange.bind(this));
  }
  private async handleInstalled(details: browser.Runtime.OnInstalledDetailsType): Promise<void> {
    if (details.reason === 'install') {
      await StorageService.resetSettings();
      await browser.tabs.create({
        url: 'https://github.com/swe-tranquang/clarity-for-facebook',
      });
    } else if (details.reason === 'update') {
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

  private handleMessage(message: { type: MessageType; payload?: unknown }, _sender: browser.Runtime.MessageSender): Promise<unknown> | void {
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

  private async handleStorageChange(changes: { [key: string]: browser.Storage.StorageChange }, areaName: string): Promise<void> {
    if (areaName === 'sync') {
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
            console.warn('Could not notify tab:', tab.id, error);
          }
        }
      }
    }
  }
}

// Initialize background service
new BackgroundService();
