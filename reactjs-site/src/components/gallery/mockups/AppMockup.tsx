import type { MockupVariant, OverlayProps } from '@/types/gallery.type';
import { Overlay } from './shared/Overlay';
import { IdleMockup } from './variants/IdleMockup';
import { TranscribingMockup } from './variants/TranscribingMockup';
import { RespondingMockup } from './variants/RespondingMockup';
import { ScreenAnalysisMockup } from './variants/ScreenAnalysisMockup';
import { GlassThemeMockup } from './variants/GlassThemeMockup';
import { GhostModeMockup } from './variants/GhostModeMockup';
import { QuotaExceededMockup } from './variants/QuotaExceededMockup';

interface AppMockupProps {
  variant: MockupVariant;
}

const videoBgParticipants = ['JM', 'SK', 'DR', 'AB'];

function renderVariant(variant: MockupVariant) {
  switch (variant) {
    case 'idle':
      return <IdleMockup />;
    case 'transcribing':
      return <TranscribingMockup />;
    case 'responding':
      return <RespondingMockup />;
    case 'screen-analysis':
      return <ScreenAnalysisMockup />;
    case 'glass-theme':
      return <GlassThemeMockup />;
    case 'ghost-mode':
      return <GhostModeMockup />;
    case 'quota-exceeded':
      return <QuotaExceededMockup />;
  }
}

function getOverlayProps(variant: MockupVariant): OverlayProps {
  switch (variant) {
    case 'idle':
      return {};
    case 'transcribing':
      return { aura: true };
    case 'responding':
      return { aura: true };
    case 'screen-analysis':
      return { expanded: true, aura: true };
    case 'glass-theme':
      return { glass: true, aura: true };
    case 'ghost-mode':
      return { ghost: true };
    case 'quota-exceeded':
      return {};
  }
}

export function AppMockup({ variant }: AppMockupProps) {
  const overlayProps = getOverlayProps(variant);
  const showVideoBg = variant === 'glass-theme';

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {showVideoBg && (
        <div className="ic-video-bg">
          {videoBgParticipants.map((p) => (
            <div key={p} className="ic-participant">
              {p}
            </div>
          ))}
        </div>
      )}
      <div data-variant={variant} className="relative z-[1]">
        <Overlay {...overlayProps}>{renderVariant(variant)}</Overlay>
      </div>
    </div>
  );
}
