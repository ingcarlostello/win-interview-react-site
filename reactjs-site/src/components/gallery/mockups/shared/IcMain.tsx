import type { ReactNode } from 'react';

export function IcMain({ children }: { children: ReactNode }) {
  return <div className="flex w-[730px] h-full flex-col flex-shrink-0">{children}</div>;
}
