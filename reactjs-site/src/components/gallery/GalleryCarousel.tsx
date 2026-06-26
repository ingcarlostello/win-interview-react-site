import { useGallery } from '@/hooks/useGallery';
import { useScaleFit } from '@/hooks/useScaleFit';
import { GALLERY_SLIDES, GALLERY_AUTOPLAY_MS } from '@/constants/gallery.constants';
import { AppMockup } from './mockups/AppMockup';
import { GalleryDot } from './GalleryDot';
import { GalleryThumb } from './GalleryThumb';
import { GalleryArrow } from './GalleryArrow';
import { cn } from '@/helpers/cn';

export function GalleryCarousel() {
  const { index, goTo, next, prev } = useGallery(GALLERY_SLIDES.length, GALLERY_AUTOPLAY_MS);
  const activeSlide = GALLERY_SLIDES[index];
  const { ref, scale } = useScaleFit(activeSlide.width, activeSlide.height);

  return (
    <div>
      <div
        ref={ref}
        className="relative mb-5 aspect-[16/10] overflow-hidden rounded-default bg-bg-elev-2"
      >
        {GALLERY_SLIDES.map((slide, i) => (
          <div
            key={slide.variant}
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-glass',
              i === index ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
          >
            <div style={{ transform: `scale(${i === index ? scale : 0})` }} className="flex-shrink-0 [transform-origin:center]">
              <AppMockup variant={slide.variant} />
            </div>
          </div>
        ))}
        <GalleryArrow direction="prev" onClick={prev} />
        <GalleryArrow direction="next" onClick={next} />
      </div>

      <div className="mb-5 flex justify-center gap-2.5">
        {GALLERY_SLIDES.map((slide, i) => (
          <GalleryDot key={slide.variant} active={i === index} onClick={() => goTo(i)} index={i} />
        ))}
      </div>

      <div className="flex justify-center gap-3">
        {GALLERY_SLIDES.map((slide, i) => (
          <GalleryThumb
            key={slide.variant}
            slide={slide}
            active={i === index}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
