import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import PortfolioLoader from './components/PortfolioLoader';

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <PortfolioLoader>
        <App initialPath={url} />
      </PortfolioLoader>
    </StrictMode>,
  );
}
