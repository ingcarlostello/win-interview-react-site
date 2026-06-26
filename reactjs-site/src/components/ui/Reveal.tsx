import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/helpers/cn';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}

export function Reveal({ children, className, as = 'div' }: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const Tag = as as 'div';
  return (
    <Tag ref={ref} className={cn('reveal', visible && 'visible', className)}>
      {children}
    </Tag>
  );
}
