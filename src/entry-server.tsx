import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import App from './App';
import PortfolioLoader from './components/PortfolioLoader';

export async function render(url: string) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <PortfolioLoader>
        <App initialPath={url} />
      </PortfolioLoader>
    </StrictMode>,
  );
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}
