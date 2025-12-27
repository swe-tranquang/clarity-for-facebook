import React, { useState } from 'react';
import type { Feature } from '@/types';

interface FeatureToggleProps {
  feature: Feature;
  isEnabled: boolean;
  isDisabled?: boolean;
  onChange: (key: string, value: boolean) => void;
}

// Icon components for each feature
const FeatureIcon: React.FC<{ featureKey: string; className?: string }> = ({ featureKey, className = "w-5 h-5" }) => {
  const iconMap: Record<string, JSX.Element> = {
    cleanMode: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    hideReels: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        <line x1="3" y1="3" x2="21" y2="21" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      </svg>
    ),
    hideSuggested: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    hideSponsored: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        <line x1="3" y1="3" x2="21" y2="21" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      </svg>
    ),
    hideSidebar: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        <line x1="14" y1="3" x2="14" y2="21" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      </svg>
    ),
    hideStories: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        <line x1="3" y1="3" x2="21" y2="21" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      </svg>
    ),
    hideRightColumn: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
        <line x1="14" y1="3" x2="14" y2="21" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      </svg>
    ),
  };

  return iconMap[featureKey] || (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
};

/**
 * Individual feature toggle component
 */
export const FeatureToggle: React.FC<FeatureToggleProps> = ({
  feature,
  isEnabled,
  isDisabled = false,
  onChange,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggle = () => {
    if (!isDisabled) {
      onChange(feature.key, !isEnabled);
    }
  };

  const isCleanMode = feature.key === 'cleanMode';

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border transition-all duration-200 ${
        isEnabled 
          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200' 
          : 'bg-white border-gray-200'
      } ${isCleanMode ? 'mb-3 border-2' : 'mb-2'} ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md hover:border-blue-300 cursor-pointer'
      }`}
      onClick={handleToggle}
      onMouseEnter={() => !isDisabled && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-50 whitespace-nowrap pointer-events-none animate-fade-in">
          {feature.description}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
      
      <div className="relative px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Icon container */}
            <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
              isEnabled 
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-500'
            }`}>
              <FeatureIcon featureKey={feature.key} className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <h3 className={`font-medium truncate ${
                isCleanMode ? 'text-base text-gray-900' : 'text-sm text-gray-800'
              }`}>
                {feature.label}
              </h3>
              {isCleanMode && (
                <span className="flex-shrink-0 px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                  Master
                </span>
              )}
            </div>
          </div>

          {/* Toggle switch */}
          <label className="toggle-switch ml-3 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={handleToggle}
              disabled={isDisabled}
              aria-label={`Toggle ${feature.label}`}
              className="sr-only"
            />
            <span className={`toggle-slider block w-11 h-6 rounded-full transition-all duration-200 ${
              isEnabled 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                : 'bg-gray-300'
            }`}>
              <span className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                isEnabled ? 'translate-x-5' : 'translate-x-0.5'
              } mt-0.5`} />
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
