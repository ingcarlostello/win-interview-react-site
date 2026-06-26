import { LegalLayout } from '@/components/legal/LegalLayout';
import { REFUNDS_DOC } from '@/constants/legal.constants';

export function RefundsPage() {
  return <LegalLayout doc={REFUNDS_DOC} />;
}
