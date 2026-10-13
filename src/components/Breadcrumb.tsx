import { breadcrumbsForPath } from '../data/pageMeta';
import RouteLink from './RouteLink';

export default function Breadcrumb({ path }: { path: string }) {
  const items = breadcrumbsForPath(path);
  if (!items) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[#a7b5c5]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {current ? (
                <span className="text-white" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <RouteLink href={item.path} className="underline-offset-4 hover:text-white hover:underline">
                  {item.name}
                </RouteLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
