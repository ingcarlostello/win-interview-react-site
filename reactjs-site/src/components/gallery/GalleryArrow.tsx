import { cn } from '@/helpers/cn';

interface GalleryArrowProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

export function GalleryArrow({ direction, onClick }: GalleryArrowProps) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous' : 'Next'}
      className={cn(
        'absolute top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white text-[1.5rem] backdrop-blur-sm transition-all duration-200 hover:bg-black/80',
        direction === 'prev' ? 'left-4' : 'right-4',
      )}
    >
      {direction === 'prev' ? '‹' : '›'}
    </button>
  );
}
