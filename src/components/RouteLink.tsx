import type { CSSProperties, Key, MouseEvent, ReactNode } from 'react';
import { goHome, navigate } from '../routes';

type RouteLinkProps = {
  key?: Key;
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: () => void;
};

export function isPlainClick(event: MouseEvent<HTMLAnchorElement>) {
  return !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0);
}

export function followRoute(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!isPlainClick(event)) return;
  event.preventDefault();
  openRoute(href);
}

function openRoute(href: string) {
  if (href === '/' || href.startsWith('/#')) {
    const section = href.startsWith('/#') ? href.slice(2) : undefined;
    goHome(section);
    return;
  }
  navigate(href);
}

export default function RouteLink({ href, className, style, children, onClick }: RouteLinkProps) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={(event) => {
        if (!isPlainClick(event)) return;
        event.preventDefault();
        onClick?.();
        openRoute(href);
      }}
    >
      {children}
    </a>
  );
}
