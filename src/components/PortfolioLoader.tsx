import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { applyRemotePosts } from '../data/blogPosts';
import { applyRemotePortfolio } from '../data/siteContent';

const PortfolioReadyContext = createContext(false);

export function usePortfolioReady() {
  return useContext(PortfolioReadyContext);
}

export default function PortfolioLoader({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/content.php')
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('content'))))
      .then((data) => {
        if (!active || !data || typeof data !== 'object') return;
        applyRemotePortfolio(data);
        if ('posts' in data) applyRemotePosts(data.posts);
        setReady(true);
      })
      .catch(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  return <PortfolioReadyContext.Provider value={ready}>{children}</PortfolioReadyContext.Provider>;
}
