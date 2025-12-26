import React from 'react';
import { EXTENSION_VERSION } from '@/constants';

/**
 * Popup footer component with version and links
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gray-100 p-4 rounded-b-lg border-t border-gray-200">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
          <span>Version {EXTENSION_VERSION}</span>
          <span>•</span>
          <a
            href="https://github.com/swe-tranquang/clarity-for-facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 hover:underline"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('Report issues on our GitHub repository');
            }}
            className="text-primary-600 hover:text-primary-700 hover:underline"
          >
            Report Issue
          </a>
        </div>
        <p className="text-xs text-gray-500">© {currentYear} Swe TranQuang. Made with ❤️</p>
      </div>
    </div>
  );
};
