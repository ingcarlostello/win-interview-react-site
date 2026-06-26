import type { LegalDoc } from '@/types/legal.type';
import { LegalHero } from '@/components/legal/LegalHero';
import { LegalContent } from '@/components/legal/LegalContent';

interface LegalLayoutProps {
  doc: LegalDoc;
}

export function LegalLayout({ doc }: LegalLayoutProps) {
  return (
    <div className="pt-20">
      <LegalHero labelKey={doc.labelKey} titleKey={doc.titleKey} updatedKey={doc.updatedKey} />
      <LegalContent doc={doc} />
    </div>
  );
}
