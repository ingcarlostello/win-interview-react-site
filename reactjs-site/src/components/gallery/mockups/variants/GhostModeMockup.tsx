import { IcMain } from '../shared/IcMain';
import { Winbar } from '../shared/Winbar';
import { BotBox, Badge, ScreenToggle, LangSelector, StatusPill, GhostBadge } from '../shared/Toolbar';
import { Divider, DividerMx, PromptBar } from '../shared/PromptBar';
import { Controls, ControlButton } from '../shared/Controls';
import { Section, SectionHeader, ResponseBadge } from '../shared/Section';
import { TranscriptionBox, ResponseBox, Markdown } from '../shared/TranscriptionBox';

export function GhostModeMockup() {
  return (
    <IcMain>
      <Winbar plan="Ultra" />
      <div className="flex items-center justify-between px-3 pb-2.5 gap-2">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <BotBox />
          <Badge variant="time">🕐 110m</Badge>
          <Badge variant="session">⏱ 10:22</Badge>
          <ScreenToggle />
        </div>
        <LangSelector flag="🇪🇸" label="Español" />
        <div className="flex items-center gap-2">
          <GhostBadge danger titleKey="ic.ghostMode" subKey="ic.clickThrough" />
          <StatusPill kind="active" dotPulse labelKey="ic.listening" mic />
        </div>
      </div>
      <Divider />
      <Controls protection="on">
        <ControlButton variant="pause" labelKey="ic.pause" icon="⏸" />
        <ControlButton variant="end" labelKey="ic.end" icon="⏹" />
      </Controls>
      <DividerMx />
      <PromptBar />
      <Section>
        <SectionHeader icon="💬" labelKey="ic.interviewer" charBadge="76 chars" />
        <TranscriptionBox questionKey="ic.mock.jwtQuestion" />
      </Section>
      <Section flex>
        <SectionHeader
          icon="🤖"
          labelKey="ic.copilot"
          badge={<ResponseBadge kind="listening" labelKey="ic.listeningBadge" />}
        />
        <ResponseBox>
          <Markdown htmlKey="ic.mock.jwtResponse" />
        </ResponseBox>
      </Section>
    </IcMain>
  );
}
