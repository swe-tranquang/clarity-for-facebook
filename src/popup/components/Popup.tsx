import React, { useEffect, useState } from 'react';
import type { ExtensionSettings, FeatureKey } from '@/types';
import { StorageService } from '@/utils/storage';
import { FEATURES } from '@/constants';
import { downloadJSON } from '@/utils/helpers';
import { Header } from './Header';
import { FeatureToggle } from './FeatureToggle';
import { Footer } from './Footer';

/**
 * Main popup component
 */
export const Popup: React.FC = () => {
  const [settings, setSettings] = useState<ExtensionSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  /**
   * Load settings from storage
   */
  const loadSettings = async () => {
    try {
      const loadedSettings = await StorageService.getSettings();
      setSettings(loadedSettings);
    } catch (error) {
      showMessage('error', 'Failed to load settings');
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle feature toggle
   */
  const handleToggle = async (key: string, value: boolean) => {
    if (!settings) return;

    try {
      const newSettings = { ...settings };

      // If toggling clean mode, update all other features
      if (key === 'cleanMode') {
        newSettings.cleanMode = value;
      } else {
        // Update individual feature
        newSettings[key as FeatureKey] = value;
      }

      await StorageService.saveSettings(newSettings);
      setSettings(newSettings);
    } catch (error) {
      showMessage('error', 'Failed to save settings');
      console.error('Failed to save settings:', error);
    }
  };

  /**
   * Export settings to JSON file
   */
  const handleExport = async () => {
    try {
      const exportData = await StorageService.exportSettings();
      const filename = `clarity-settings-${new Date().getTime()}.json`;
      downloadJSON(exportData, filename);
      showMessage('success', 'Settings exported successfully!');
    } catch (error) {
      showMessage('error', 'Failed to export settings');
      console.error('Failed to export settings:', error);
    }
  };

  /**
   * Import settings from JSON file
   */
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);
        await StorageService.importSettings(data);
        await loadSettings();
        showMessage('success', 'Settings imported successfully!');
      } catch (error) {
        showMessage('error', 'Failed to import settings. Invalid file format.');
        console.error('Failed to import settings:', error);
      }
    };

    input.click();
  };

  /**
   * Reset settings to default
   */
  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset all settings to default?')) {
      return;
    }

    try {
      await StorageService.resetSettings();
      await loadSettings();
      showMessage('success', 'Settings reset to default!');
    } catch (error) {
      showMessage('error', 'Failed to reset settings');
      console.error('Failed to reset settings:', error);
    }
  };

  /**
   * Show temporary message
   */
  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className="popup-container flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="popup-container flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p>Failed to load settings</p>
          <button
            onClick={loadSettings}
            className="mt-4 btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const cleanModeFeature = FEATURES.find((f) => f.key === 'cleanMode')!;
  const otherFeatures = FEATURES.filter((f) => f.key !== 'cleanMode');

  return (
    <div className="popup-container bg-gray-50 flex flex-col">
      <Header
        onExport={handleExport}
        onImport={handleImport}
        onReset={handleReset}
      />

      {/* Message notification */}
      {message && (
        <div
          className={`mx-6 mt-4 p-3 rounded-lg text-sm font-medium animate-fade-in ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Features list */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Clean Mode toggle */}
        <FeatureToggle
          feature={cleanModeFeature}
          isEnabled={settings.cleanMode}
          onChange={handleToggle}
        />

        {/* Info message when clean mode is off */}
        {!settings.cleanMode && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4 text-sm text-yellow-800">
            <p className="font-medium">⚠️ Clean Mode is disabled</p>
            <p className="text-xs mt-1">
              Enable Clean Mode to start filtering your Facebook feed.
            </p>
          </div>
        )}

        {/* Other features */}
        <div className="space-y-2">
          {otherFeatures.map((feature) => (
            <FeatureToggle
              key={feature.key}
              feature={feature}
              isEnabled={settings[feature.key]}
              isDisabled={!settings.cleanMode}
              onChange={handleToggle}
            />
          ))}
        </div>

        {/* Helper text */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
          <p className="font-medium mb-1">💡 Pro Tip:</p>
          <p>
            Your settings are automatically synced across all your devices where
            you're signed in to your browser.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

