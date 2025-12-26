import React from 'react';

interface HeaderProps {
  onExport: () => void;
  onImport: () => void;
  onReset: () => void;
}

/**
 * Popup header component with logo and action buttons
 */
export const Header: React.FC<HeaderProps> = ({ onExport, onImport, onReset }) => {
  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-t-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">✨</div>
          <div>
            <h1 className="text-xl font-bold">Clarity for Facebook</h1>
            <p className="text-xs text-primary-100">Clean your feed, save your time</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onExport}
          className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-3 rounded-md transition-all duration-200"
          title="Export settings"
        >
          📤 Export
        </button>
        <button
          onClick={onImport}
          className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-3 rounded-md transition-all duration-200"
          title="Import settings"
        >
          📥 Import
        </button>
        <button
          onClick={onReset}
          className="flex-1 bg-red-500/80 hover:bg-red-600 text-white text-xs py-2 px-3 rounded-md transition-all duration-200"
          title="Reset to default"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
};
