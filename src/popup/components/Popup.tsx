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
      console.error('[Popup] Failed to load settings:', error);
      showMessage('error', 'Failed to load settings');
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
      console.error('[Popup] Failed to save settings:', error);
      showMessage('error', 'Failed to save settings');
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
      <div className="popup-container flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="popup-container flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 font-semibold mb-4">Failed to load settings</p>
          <button
            onClick={loadSettings}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
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
    <div className="popup-container bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header onExport={handleExport} onImport={handleImport} onReset={handleReset} />

      {/* Message notification */}
      {message && (
        <div className="mx-6 mt-4 animate-slide-down">
          <div
            className={`p-4 rounded-xl text-sm font-medium shadow-lg backdrop-blur-sm ${message.type === 'success'
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-2 border-green-200'
              : 'bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-2 border-red-200'
              }`}
          >
            <div className="flex items-center space-x-3">
              {message.type === 'success' ? (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span>{message.text}</span>
            </div>
          </div>
        </div>
      )}

      {/* Features list */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Clean Mode toggle */}
        <FeatureToggle
          feature={cleanModeFeature}
          isEnabled={settings.cleanMode}
          onChange={handleToggle}
        />

        {/* Info message when clean mode is off */}
        {!settings.cleanMode && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-amber-900 mb-1">Clean Mode is disabled</p>
                <p className="text-sm text-amber-800">
                  Enable Clean Mode to start filtering your Facebook feed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Other features */}
        <div className="space-y-3">
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
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-blue-900 mb-1">Pro Tip</p>
              <p className="text-sm text-blue-800">
                Your settings are automatically synced across all your devices where you're
                signed in to your browser.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
