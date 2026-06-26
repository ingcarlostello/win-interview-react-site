import { useLanguage } from '@/hooks/useLanguage';
import type { LegalSection as LegalSectionType } from '@/types/legal.type';

interface LegalSectionProps {
  section: LegalSectionType;
}

export function LegalSection({ section }: LegalSectionProps) {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="mt-10 mb-4 text-[clamp(1.4rem,3vw,1.8rem)] font-bold">{t(section.titleKey)}</h2>
      {section.blocks.map((block, i) => {
        if (block.kind === 'paragraph') {
          return (
            <p key={i} className="mb-4 text-text-secondary" dangerouslySetInnerHTML={{ __html: t(block.key) }} />
          );
        }
        return (
          <div key={i}>
            <ul className="mb-4 ml-6 list-disc text-text-secondary [&_li]:mb-2">
              {block.items.map((item) => (
                <li key={item} dangerouslySetInnerHTML={{ __html: t(item) }} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
