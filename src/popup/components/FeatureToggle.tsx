import React, { useState } from 'react';
import type { Feature } from '@/types';
import {
  CleanModeIcon,
  RemoveStoriesIcon,
  RemoveReelsIcon,
  RemoveSponsoredIcon,
  RemoveSuggestedIcon,
  RemoveMarketplaceIcon,
  RemoveSearchAdsIcon,
  RemovePeopleYouMayKnowIcon,
  RemoveGroupSuggestionsIcon,
} from './icons';

interface FeatureToggleProps {
  feature: Feature;
  isEnabled: boolean;
  isDisabled?: boolean;
  onChange: (key: string, value: boolean) => void;
}

// Icon components for each feature
const FeatureIcon: React.FC<{ featureKey: string; className?: string }> = ({ featureKey, className = "w-5 h-5" }) => {
  const iconMap: Record<string, JSX.Element> = {
    cleanMode: <CleanModeIcon className={className} />,
    removeStories: <RemoveStoriesIcon className={className} />,
    removeReels: <RemoveReelsIcon className={className} />,
    removeSponsored: <RemoveSponsoredIcon className={className} />,
    removeSuggested: <RemoveSuggestedIcon className={className} />,
    removeMarketplace: <RemoveMarketplaceIcon className={className} />,
    removeSearchAds: <RemoveSearchAdsIcon className={className} />,
    removePeopleYouMayKnow: <RemovePeopleYouMayKnowIcon className={className} />,
    removeGroupSuggestions: <RemoveGroupSuggestionsIcon className={className} />,
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
      className={`group relative overflow-hidden rounded-lg border transition-all duration-200 ${isEnabled
        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
        : 'bg-white border-gray-200'
        } ${isCleanMode ? 'mb-3 border-2' : 'mb-2'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md hover:border-blue-300 cursor-pointer'
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
            <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${isEnabled
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
              : 'bg-gray-100 text-gray-500'
              }`}>
              <FeatureIcon featureKey={feature.key} className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <h3 className={`font-medium truncate ${isCleanMode ? 'text-base text-gray-900' : 'text-sm text-gray-800'
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
          <label className="toggle-switch ml-3" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={handleToggle}
              disabled={isDisabled}
              aria-label={`Toggle ${feature.label}`}
            />
            <span className="toggle-slider" />
          </label>
        </div>
      </div>
    </div>
  );
};
