import { IcMain } from '../shared/IcMain';
import { Winbar } from '../shared/Winbar';
import { BotBox, Badge, ScreenToggle, LangSelector, StatusPill } from '../shared/Toolbar';
import { Divider, DividerMx, PromptBar } from '../shared/PromptBar';
import { Controls, ControlButton } from '../shared/Controls';
import { Section, SectionHeader, ResponseBadge } from '../shared/Section';
import { TranscriptionBox, ResponseBox, Markdown } from '../shared/TranscriptionBox';
import { QuestionCounter } from '../shared/QuotaMessage';

export function RespondingMockup() {
  return (
    <IcMain>
      <Winbar plan="Pro" />
      <div className="flex items-center justify-between px-3 pb-2.5 gap-2">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <BotBox />
          <Badge variant="time">🕐 116m</Badge>
          <Badge variant="session">⏱ 04:32</Badge>
          <ScreenToggle />
        </div>
        <LangSelector flag="🇪🇸" label="Español" />
        <StatusPill kind="active" labelKey="ic.responding" mic />
      </div>
      <Divider />
      <Controls protection="on">
        <ControlButton variant="pause" labelKey="ic.pause" icon="⏸" />
        <ControlButton variant="end" labelKey="ic.end" icon="⏹" />
      </Controls>
      <DividerMx />
      <PromptBar />
      <Section>
        <SectionHeader icon="💬" labelKey="ic.interviewer" charBadge="127 chars" />
        <TranscriptionBox questionKey="ic.mock.gcQuestion" />
      </Section>
      <Section flex>
        <SectionHeader
          icon="🤖"
          labelKey="ic.copilot"
          spin
          badge={<ResponseBadge kind="responding" labelKey="ic.respondingBadge" />}
        />
        <ResponseBox>
          <Markdown htmlKey="ic.mock.gcResponse" />
        </ResponseBox>
      </Section>
      <QuestionCounter count={3} />
    </IcMain>
  );
}
