import React from 'react';
import { createRoot } from 'react-dom/client';
import { Popup } from './components/Popup';
import './styles.css';

/**
 * Initialize popup React application
 */
function initPopup() {
  const container = document.getElementById('root');

  if (container) {
    try {
      const root = createRoot(container);
      root.render(
        <React.StrictMode>
          <Popup />
        </React.StrictMode>
      );
    } catch (error) {
      console.error('[Popup] ❌ Error during React initialization:', error);
    }
  } else {
    console.error('[Popup] ❌ Root element not found!');
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPopup);
} else {
  initPopup();
}
