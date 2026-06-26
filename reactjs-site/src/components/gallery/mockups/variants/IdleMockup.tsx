import { IcMain } from '../shared/IcMain';
import { Winbar } from '../shared/Winbar';
import { BotBox, Badge, ScreenToggle, LangSelector, StatusPill } from '../shared/Toolbar';
import { Divider, DividerMx, PromptBar } from '../shared/PromptBar';
import { Controls, ControlButton } from '../shared/Controls';
import { Section, SectionHeader, ResponseBadge } from '../shared/Section';
import { TranscriptionBox, ResponseBox, Placeholder } from '../shared/TranscriptionBox';

export function IdleMockup() {
  return (
    <IcMain>
      <Winbar plan="Pro" />
      <div className="flex items-center justify-between px-3 pb-2.5 gap-2">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <BotBox />
          <Badge variant="time">🕐 120m</Badge>
          <Badge variant="session">⏱ 00:00</Badge>
          <ScreenToggle />
        </div>
        <LangSelector flag="🇪🇸" label="Español" />
        <StatusPill kind="idle" labelKey="ic.disconnected" />
      </div>
      <Divider />
      <Controls protection="on">
        <ControlButton variant="listen" labelKey="ic.listen" icon="🎙" />
      </Controls>
      <DividerMx />
      <PromptBar />
      <Section>
        <SectionHeader icon="💬" labelKey="ic.interviewer" charBadge="0 chars" />
        <TranscriptionBox
          placeholder={
            <Placeholder
              icon="◯"
              titleKey="ic.waiting"
              subKey="ic.pressListen"
            />
          }
        />
      </Section>
      <Section flex>
        <SectionHeader icon="🤖" labelKey="ic.copilot" badge={<ResponseBadge kind="ready" labelKey="ic.ready" />} />
        <ResponseBox>
          <Placeholder
            icon="⚡"
            titleKey="ic.copilotReady"
            descKey="ic.copilotReadyDesc"
          />
        </ResponseBox>
      </Section>
    </IcMain>
  );
}
