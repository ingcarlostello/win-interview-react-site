import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, X } from 'lucide-react';
import { cn } from '@/helpers/cn';
import { Glass } from '@/components/ui/Glass';
import { Button } from '@/components/ui/Button';

interface ModalProps {
  open: boolean;
  title: string;
  children?: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
  danger?: boolean;
}

const disabledCls = 'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0';

// Diálogo de confirmación accesible (portal + overlay + cierre con Esc). El sitio no
// tenía primitivo de modal; el dashboard usaba window.confirm.
export function Modal({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onClose,
  loading = false,
  danger = false,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape' && !loading) onClose();
    }
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, loading, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => !loading && onClose()}
      />
      <Glass elevated className="relative z-[101] w-full max-w-md rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <button
            type="button"
            onClick={() => !loading && onClose()}
            disabled={loading}
            aria-label={cancelLabel}
            className="text-text-muted transition-colors hover:text-text-primary disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {children && <div className="mt-4 text-sm text-text-secondary">{children}</div>}

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <Button
            as="button"
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={loading}
            className={disabledCls}
          >
            {cancelLabel}
          </Button>
          <Button
            as="button"
            type="button"
            variant={danger ? 'secondary' : 'primary'}
            onClick={onConfirm}
            disabled={loading}
            className={cn(disabledCls, danger && 'border-border-danger text-danger')}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {confirmLabel}
          </Button>
        </div>
      </Glass>
    </div>,
    document.body,
  );
}
