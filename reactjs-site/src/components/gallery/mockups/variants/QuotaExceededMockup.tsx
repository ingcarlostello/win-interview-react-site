import { IcMain } from '../shared/IcMain';
import { Winbar } from '../shared/Winbar';
import { BotBox, Badge, ScreenToggle, LangSelector, StatusPill } from '../shared/Toolbar';
import { Divider, DividerMx, PromptBar } from '../shared/PromptBar';
import { ControlButton, Protection } from '../shared/Controls';
import { Section, SectionHeader, ResponseBadge } from '../shared/Section';
import { TranscriptionBox, ResponseBox, Placeholder } from '../shared/TranscriptionBox';
import { QuotaMessage } from '../shared/QuotaMessage';

export function QuotaExceededMockup() {
  return (
    <IcMain>
      <Winbar plan="Lite" />
      <div className="flex items-center justify-between px-3 pb-2.5 gap-2">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <BotBox />
          <Badge variant="time">🕐 0m</Badge>
          <Badge variant="session">⏱ 20:00</Badge>
          <ScreenToggle />
        </div>
        <LangSelector flag="🇪🇸" label="Español" />
        <StatusPill kind="paused" labelKey="ic.paused" />
      </div>
      <Divider />
      <div className="flex items-center justify-between px-3 pb-2">
        <div className="mt-1 mb-1 flex items-center gap-2">
          <ControlButton variant="locked" labelKey="ic.quotaExhausted" icon="🔒" />
        </div>
        <Protection state="locked" />
      </div>
      <DividerMx />
      <PromptBar />
      <Section>
        <SectionHeader icon="💬" labelKey="ic.interviewer" charBadge="0 chars" />
        <TranscriptionBox
          placeholder={<Placeholder icon="◯" titleKey="ic.waiting" />}
        />
      </Section>
      <Section flex>
        <SectionHeader
          icon="🤖"
          labelKey="ic.copilot"
          badge={<ResponseBadge kind="ready" labelKey="ic.ready" />}
        />
        <ResponseBox>
          <QuotaMessage />
        </ResponseBox>
      </Section>
    </IcMain>
  );
}
