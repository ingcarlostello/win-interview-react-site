import type { ReactNode } from 'react';
import { cn } from '@/helpers/cn';

interface GlassProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}

export function Glass({ children, className, elevated = false }: GlassProps) {
  return <div className={cn(elevated ? 'glass-elev' : 'glass', className)}>{children}</div>;
}
