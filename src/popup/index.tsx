import React from 'react';
import { createRoot } from 'react-dom/client';
import { Popup } from './components/Popup';
import './styles.css';

/**
 * Initialize popup React application
 */
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
