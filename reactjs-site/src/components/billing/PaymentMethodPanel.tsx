import { CreditCard } from 'lucide-react';
import { cn } from '@/helpers/cn';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/Button';

const disabledCls = 'opacity-60 cursor-not-allowed hover:translate-y-0';

// Presentacional: abre el overlay de Paddle.js para actualizar el método de pago.
export function PaymentMethodPanel({
  busy,
  onUpdate,
}: {
  busy: boolean;
  onUpdate: () => void;
}) {
  const { t } = useLanguage();
  return (
    <Button
      as="button"
      type="button"
      variant="secondary"
      disabled={busy}
      onClick={onUpdate}
      className={cn('text-sm', busy && disabledCls)}
    >
      <CreditCard size={14} />
      {t('billing.updatePayment')}
    </Button>
  );
}
