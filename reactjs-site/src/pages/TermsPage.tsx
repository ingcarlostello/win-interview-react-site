import { LegalLayout } from '@/components/legal/LegalLayout';
import { TERMS_DOC } from '@/constants/legal.constants';

export function TermsPage() {
  return <LegalLayout doc={TERMS_DOC} />;
}
