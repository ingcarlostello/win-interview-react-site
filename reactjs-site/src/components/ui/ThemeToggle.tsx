import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/helpers/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isGlass = theme === 'glass';
  return (
    <button
      onClick={toggleTheme}
      title={isGlass ? 'Switch to dark' : 'Switch to glass'}
      className={cn(
        'flex h-[38px] w-[38px] items-center justify-center rounded-xs border border-border bg-bg-elev-1 text-text-secondary text-base transition-all duration-200 ease-out hover:text-text-primary hover:border-border-strong hover:bg-bg-elev-2',
        className,
      )}
      aria-label="Toggle theme"
    >
      {isGlass ? '◑' : '◐'}
    </button>
  );
}
