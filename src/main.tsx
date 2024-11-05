import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apollo';
import App from './App';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ApolloProvider client={apolloClient}>
          <AnalyticsProvider>
            <App />
          </AnalyticsProvider>
        </ApolloProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);