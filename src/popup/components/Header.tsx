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
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-4 shadow-lg">
      <div className="flex items-center space-x-3 mb-5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center">
          <img src="/icons/icon.svg" alt="Clarity" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Clarity for Facebook</h1>
          <p className="text-sm text-blue-100 opacity-90">Clean your feed, save your time</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onExport}
          className="group flex items-center justify-center space-x-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm py-2.5 px-3 rounded-lg transition-all duration-200 hover:scale-105"
          title="Export settings"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="font-medium">Export</span>
        </button>
        <button
          onClick={onImport}
          className="group flex items-center justify-center space-x-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm py-2.5 px-3 rounded-lg transition-all duration-200 hover:scale-105"
          title="Import settings"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span className="font-medium">Import</span>
        </button>
        <button
          onClick={onReset}
          className="group flex items-center justify-center space-x-1.5 bg-red-500/80 hover:bg-red-600 text-white text-sm py-2.5 px-3 rounded-lg transition-all duration-200 hover:scale-105"
          title="Reset to default"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="font-medium">Reset</span>
        </button>
      </div>
    </div>
  );
};
