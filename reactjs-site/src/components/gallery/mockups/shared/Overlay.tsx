import type { ReactNode } from 'react';
import { cn } from '@/helpers/cn';
import type { OverlayProps } from '@/types/gallery.type';

interface OverlayPropsExtended extends OverlayProps {
  children: ReactNode;
  className?: string;
}

const overlayBase =
  'flex flex-row overflow-hidden font-sans text-text-primary text-left relative';

export function Overlay({
  children,
  expanded = false,
  glass = false,
  aura = false,
  ghost = false,
  className,
}: OverlayPropsExtended) {
  return (
    <div
      className={cn(
        overlayBase,
        expanded ? 'w-[1600px]' : 'w-[730px]',
        'h-[730px]',
        'bg-black/60 backdrop-blur-2xl border border-white/10 rounded-default',
        'shadow-[0_8px_48px_-8px_rgb(120_160_255/0.2),0_2px_16px_rgb(255_255_255/0.06)]',
        glass && 'bg-[rgb(20_22_30/0.45)] z-[1]',
        aura &&
          'border-accent-border shadow-[0_0_20px_var(--color-accent-glow),0_0_40px_var(--color-accent-soft-2),inset_0_0_20px_var(--color-accent-soft-2)]',
        ghost && 'border-[rgb(239_68_68/0.5)] animate-ghost-pulse',
        className,
      )}
    >
      {children}
    </div>
  );
}
