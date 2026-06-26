import { LegalLayout } from '@/components/legal/LegalLayout';
import { PRIVACY_DOC } from '@/constants/legal.constants';

export function PrivacyPage() {
  return <LegalLayout doc={PRIVACY_DOC} />;
}
