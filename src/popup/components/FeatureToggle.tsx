import React from 'react';
import type { Feature } from '@/types';

interface FeatureToggleProps {
  feature: Feature;
  isEnabled: boolean;
  isDisabled?: boolean;
  onChange: (key: string, value: boolean) => void;
}

/**
 * Individual feature toggle component
 */
export const FeatureToggle: React.FC<FeatureToggleProps> = ({
  feature,
  isEnabled,
  isDisabled = false,
  onChange,
}) => {
  const handleToggle = () => {
    if (!isDisabled) {
      onChange(feature.key, !isEnabled);
    }
  };

  const isCleanMode = feature.key === 'cleanMode';

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
        isEnabled ? 'bg-primary-50 border-primary-300' : 'bg-gray-50 border-gray-200'
      } ${isCleanMode ? 'mb-4 shadow-md' : 'mb-3'} ${
        isDisabled ? 'opacity-60' : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <span className="text-2xl" role="img" aria-label={feature.label}>
            {feature.icon}
          </span>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className={`font-semibold ${isCleanMode ? 'text-lg' : 'text-base'}`}>
                {feature.label}
              </h3>
            </div>
            <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
          </div>
        </div>

        <label className="toggle-switch ml-3">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={handleToggle}
            disabled={isDisabled}
            aria-label={`Toggle ${feature.label}`}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
    </div>
  );
};
