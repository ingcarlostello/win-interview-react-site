import { IcMain } from '../shared/IcMain';
import { Winbar } from '../shared/Winbar';
import { BotBox, Badge, ScreenToggle, LangSelector, StatusPill } from '../shared/Toolbar';
import { Divider, DividerMx, PromptBar } from '../shared/PromptBar';
import { Controls, ControlButton } from '../shared/Controls';
import { Section, SectionHeader, ResponseBadge } from '../shared/Section';
import { TranscriptionBox, ResponseBox, Markdown } from '../shared/TranscriptionBox';
import { ScreenPanel } from '../shared/ScreenPanel';

export function ScreenAnalysisMockup() {
  return (
    <>
      <IcMain>
        <Winbar plan="Ultra" />
        <div className="flex items-center justify-between px-3 pb-2.5 gap-2">
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <BotBox />
            <Badge variant="time">🕐 112m</Badge>
            <Badge variant="session">⏱ 08:45</Badge>
            <ScreenToggle active />
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
          <SectionHeader icon="💬" labelKey="ic.interviewer" charBadge="89 chars" />
          <TranscriptionBox questionKey="ic.mock.rlQuestion" />
        </Section>
        <Section flex>
          <SectionHeader
            icon="🤖"
            labelKey="ic.copilot"
            badge={<ResponseBadge kind="responding" labelKey="ic.respondingBadge" />}
          />
          <ResponseBox>
            <Markdown htmlKey="ic.mock.rlResponse" />
          </ResponseBox>
        </Section>
      </IcMain>
      <ScreenPanel />
    </>
  );
}
