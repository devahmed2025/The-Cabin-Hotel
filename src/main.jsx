import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Optional: reload or navigate
        window.location.reload();
      }}
    >
      {/* <Provider store={store}> */}
      <App />
      {/* </Provider> */}
    </ErrorBoundary>
  </React.StrictMode>,
);
