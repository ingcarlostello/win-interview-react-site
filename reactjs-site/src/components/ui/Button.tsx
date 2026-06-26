import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/helpers/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-[#0a0a0a] shadow-[0_0_20px_var(--color-accent-glow)] hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_0_30px_var(--color-accent-glow),0_8px_24px_rgb(0_0_0/0.3)]',
  secondary:
    'bg-bg-elev-2 text-text-primary border border-border-strong hover:bg-bg-elev-3 hover:-translate-y-0.5 hover:border-accent-border',
  ghost: 'text-text-secondary px-[18px] py-2.5 hover:text-text-primary',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-xs px-6 py-3 text-[0.95rem] font-semibold transition-all duration-200 ease-out whitespace-nowrap';

type AnchorButtonProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };
type NativeButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type ButtonProps = AnchorButtonProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, className, ...rest } = props;
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (props.as === 'a') {
    const { as: _as, ...anchorRest } = rest as AnchorButtonProps;
    return (
      <a className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }
  const { as: _as, ...buttonRest } = rest as NativeButtonProps;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
