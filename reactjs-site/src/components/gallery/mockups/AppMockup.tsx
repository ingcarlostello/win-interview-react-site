import type { MockupVariant } from '@/types/gallery.type';
import { Overlay } from './shared/Overlay';
import { DashboardMockup } from './variants/DashboardMockup';
import { PracticeMockup } from './variants/PracticeMockup';
import { ReportMockup } from './variants/ReportMockup';
import { QuestionBankMockup } from './variants/QuestionBankMockup';

interface AppMockupProps {
  variant: MockupVariant;
}

function renderVariant(variant: MockupVariant) {
  switch (variant) {
    case 'dashboard':
      return <DashboardMockup />;
    case 'practice':
      return <PracticeMockup />;
    case 'report':
      return <ReportMockup />;
    case 'question-bank':
      return <QuestionBankMockup />;
  }
}

export function AppMockup({ variant }: AppMockupProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div data-variant={variant} className="relative z-[1]">
        <Overlay aura>{renderVariant(variant)}</Overlay>
      </div>
    </div>
  );
}
