export type MockupVariant =
  | 'idle'
  | 'transcribing'
  | 'responding'
  | 'screen-analysis'
  | 'glass-theme'
  | 'ghost-mode'
  | 'quota-exceeded';

export interface GallerySlide {
  variant: MockupVariant;
  thumbIcon: string;
  labelKey: string;
  width: number;
  height: number;
}

export interface MockupStatus {
  badge: 'ready' | 'listening' | 'thinking' | 'responding' | 'paused';
  dotPulse?: boolean;
}

export interface MockupTheme {
  variant: 'dark' | 'glass';
}

export interface OverlayProps {
  expanded?: boolean;
  glass?: boolean;
  aura?: boolean;
  ghost?: boolean;
}
