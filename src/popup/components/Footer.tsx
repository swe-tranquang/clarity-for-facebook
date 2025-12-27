import React from 'react';
import { EXTENSION_VERSION } from '@/constants';

/**
 * Popup footer component with version and links
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 px-5 py-3.5 rounded-b-xl border-t border-gray-200">
      <div className="space-y-2.5">
        {/* Top row: Version + Links */}
        <div className="flex items-center justify-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 text-gray-500">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="font-medium">v{EXTENSION_VERSION}</span>
          </div>

          <span className="text-gray-300">•</span>

          <a
            href="https://github.com/swe-tranquang/clarity-for-facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-2.5 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
            title="View on GitHub"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">GitHub</span>
          </a>

          <span className="text-gray-300">•</span>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('Report issues on our GitHub repository');
            }}
            className="flex items-center space-x-1.5 px-2.5 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
            title="Report an issue"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">Report Issue</span>
          </a>
        </div>

        {/* Bottom row: Author info */}
        <div className="text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center space-x-1.5">
            <span>© {currentYear} swe-tranquang</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
