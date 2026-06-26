import { SectionShell, SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { GalleryCarousel } from '@/components/gallery/GalleryCarousel';

export function GallerySection() {
  return (
    <SectionShell id="screenshots">
      <Reveal>
        <SectionHeader
          labelKey="gallery.label"
          titleKey="gallery.title"
          subtitleKey="gallery.subtitle"
        />
      </Reveal>
      <Reveal>
        <GalleryCarousel />
      </Reveal>
    </SectionShell>
  );
}
