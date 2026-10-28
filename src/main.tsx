import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import PortfolioLoader from './components/PortfolioLoader.tsx';
import {preloadRoute} from './routeChunks';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <PortfolioLoader>
      <App />
    </PortfolioLoader>
  </StrictMode>
);

void preloadRoute(window.location.pathname).then(() => {
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
});
