import { cn } from '@/helpers/cn';

interface GalleryDotProps {
  active: boolean;
  onClick: () => void;
  index: number;
}

export function GalleryDot({ active, onClick, index }: GalleryDotProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`Go to slide ${index + 1}`}
      className={cn(
        'h-2.5 w-2.5 rounded-full bg-border-strong transition-all duration-200',
        active && 'w-7 rounded-[5px] bg-accent shadow-[0_0_8px_var(--color-accent-glow)]',
      )}
    />
  );
}
