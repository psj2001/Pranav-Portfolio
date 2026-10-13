export function trackEvent(event: string, params: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;
  const target = window as Window & { dataLayer?: Array<Record<string, string>> };
  target.dataLayer = target.dataLayer ?? [];
  target.dataLayer.push({ event, ...params });
}
