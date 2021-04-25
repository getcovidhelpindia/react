// Libraries
import { Suspense, lazy, StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Utilities
import { loadScript, retry } from './utils';

// Components
const App = lazy(() => retry(() => import('./App')));
const rootElement = document.getElementById('root');

const main = () =>
  render(
    <Suspense fallback={<div />}>
      <Router>
        <StrictMode>
          <App />
        </StrictMode>
      </Router>
    </Suspense>,
    rootElement
  );

const browserSupportsAllFeatures = () => {
  return window.requestIdleCallback && window.IntersectionObserver;
};

if (browserSupportsAllFeatures()) {
  main();
} else {
  loadScript(
    'https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=requestIdleCallback%2CIntersectionObserver',
    main
  );
}
