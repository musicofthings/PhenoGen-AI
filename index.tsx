
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Root mounting logic
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical: Could not find root element '#root'.");
} else {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
