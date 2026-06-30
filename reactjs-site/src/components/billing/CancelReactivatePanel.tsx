import { RotateCcw, Undo2, XCircle } from 'lucide-react';
import type { BillingState } from '@/helpers/billing.helper';
import { cn } from '@/helpers/cn';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/Button';

const disabledCls = 'opacity-60 cursor-not-allowed hover:translate-y-0';

// Presentacional: acciones de cancelar / reactivar / deshacer downgrade según el estado.
export function CancelReactivatePanel({
  state,
  busy,
  onCancel,
  onReactivate,
  onUndoDowngrade,
}: {
  state: BillingState;
  busy: boolean;
  onCancel: () => void;
  onReactivate: () => void;
  onUndoDowngrade: () => void;
}) {
  const { t } = useLanguage();

  if (state === 'cancel_pending') {
    return (
      <Button
        as="button"
        type="button"
        variant="primary"
        disabled={busy}
        onClick={onReactivate}
        className={cn('text-sm', busy && disabledCls)}
      >
        <RotateCcw size={14} />
        {t('billing.reactivate')}
      </Button>
    );
  }

  return (
    <>
      {state === 'downgrade_pending' && (
        <Button
          as="button"
          type="button"
          variant="secondary"
          disabled={busy}
          onClick={onUndoDowngrade}
          className={cn('text-sm', busy && disabledCls)}
        >
          <Undo2 size={14} />
          {t('billing.undoDowngrade')}
        </Button>
      )}
      <Button
        as="button"
        type="button"
        variant="ghost"
        disabled={busy}
        onClick={onCancel}
        className={cn('text-sm', busy && disabledCls)}
      >
        <XCircle size={14} />
        {t('billing.cancel')}
      </Button>
    </>
  );
}
