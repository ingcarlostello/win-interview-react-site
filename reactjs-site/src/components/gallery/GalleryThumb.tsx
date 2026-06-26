import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';
import type { GallerySlide } from '@/types/gallery.type';

interface GalleryThumbProps {
  slide: GallerySlide;
  active: boolean;
  onClick: () => void;
}

export function GalleryThumb({ slide, active, onClick }: GalleryThumbProps) {
  const { t } = useLanguage();
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-[90px] rounded-xs overflow-hidden border-2 transition-all duration-200',
        active ? 'border-accent opacity-100 shadow-[0_0_12px_var(--color-accent-soft)]' : 'border-transparent opacity-50 hover:opacity-80',
      )}
    >
      <div className="flex flex-col items-center justify-center gap-1 px-1 py-1.5 text-center">
        <span className="text-[18px]">{slide.thumbIcon}</span>
        <span className="text-[8px] font-medium leading-[1.2] text-text-secondary">
          {t(slide.labelKey)}
        </span>
      </div>
    </button>
  );
}
