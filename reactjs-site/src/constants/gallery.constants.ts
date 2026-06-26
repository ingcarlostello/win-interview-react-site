import type { GallerySlide } from '@/types/gallery.type';

export const GALLERY_SLIDES: readonly GallerySlide[] = [
  { variant: 'idle', thumbIcon: '🟢', labelKey: 'gallery.slide0', width: 730, height: 730 },
  { variant: 'transcribing', thumbIcon: '🎙️', labelKey: 'gallery.slide1', width: 730, height: 730 },
  { variant: 'responding', thumbIcon: '⚡', labelKey: 'gallery.slide2', width: 730, height: 730 },
  { variant: 'screen-analysis', thumbIcon: '🖥️', labelKey: 'gallery.slide3', width: 1600, height: 730 },
  { variant: 'glass-theme', thumbIcon: '🔮', labelKey: 'gallery.slide4', width: 730, height: 730 },
  { variant: 'ghost-mode', thumbIcon: '👻', labelKey: 'gallery.slide5', width: 730, height: 730 },
  { variant: 'quota-exceeded', thumbIcon: '⏸️', labelKey: 'gallery.slide6', width: 730, height: 730 },
] as const;

export const GALLERY_AUTOPLAY_MS = 4000;
