import type { GallerySlide } from '@/types/gallery.type';

export const GALLERY_SLIDES: readonly GallerySlide[] = [
  { variant: 'dashboard', thumbIcon: '📊', labelKey: 'gallery.slide0', width: 730, height: 730 },
  { variant: 'practice', thumbIcon: '🎯', labelKey: 'gallery.slide1', width: 730, height: 730 },
  { variant: 'report', thumbIcon: '📈', labelKey: 'gallery.slide2', width: 730, height: 730 },
  { variant: 'question-bank', thumbIcon: '🗂️', labelKey: 'gallery.slide3', width: 730, height: 730 },
] as const;

export const GALLERY_AUTOPLAY_MS = 4000;
