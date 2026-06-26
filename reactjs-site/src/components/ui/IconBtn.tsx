import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/helpers/cn';

interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function IconBtn({ children, className, ...rest }: IconBtnProps) {
  return (
    <button
      className={cn(
        'flex h-[38px] w-[38px] items-center justify-center rounded-xs border border-border bg-bg-elev-1 text-text-secondary text-base transition-all duration-200 ease-out hover:text-text-primary hover:border-border-strong hover:bg-bg-elev-2',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
