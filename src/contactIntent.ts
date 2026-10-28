const KEY = '__portfolioContactInterest';

type IntentWindow = Window & { [KEY]?: string };

export function queueContactInterest(interest: string) {
  (window as IntentWindow)[KEY] = interest;
}

export function readQueuedInterest() {
  if (typeof window === 'undefined') return null;
  return (window as IntentWindow)[KEY] ?? null;
}

export function clearQueuedInterest() {
  if (typeof window === 'undefined') return;
  delete (window as IntentWindow)[KEY];
}
