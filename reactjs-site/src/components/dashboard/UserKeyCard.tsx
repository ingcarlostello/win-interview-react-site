import { useState } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { Check, Copy, Eye, EyeOff, KeyRound, LogOut, RefreshCw } from 'lucide-react';
import { regenerateUserKeyRef, type DashboardUser } from '@/lib/convexApi';
import { Glass } from '@/components/ui/Glass';
import { Button } from '@/components/ui/Button';
import { cn } from '@/helpers/cn';
import { planLabel } from '@/helpers/plan.helper';

interface UserKeyCardProps {
  user: DashboardUser;
}

export function UserKeyCard({ user }: UserKeyCardProps) {
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const regenerate = useMutation(regenerateUserKeyRef);

  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const email = clerkUser?.primaryEmailAddress?.emailAddress ?? user.email ?? '';
  const userKey = user.userKey;

  const handleCopy = async () => {
    if (!userKey) return;
    await window.navigator.clipboard.writeText(userKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleRegenerate = async () => {
    const ok = window.confirm(
      '¿Regenerar tu clave? La clave actual dejará de funcionar en la app de escritorio.',
    );
    if (!ok) return;
    setRegenerating(true);
    try {
      await regenerate({});
      setRevealed(true);
    } catch (err) {
      console.error('regenerateUserKey falló:', err);
      window.alert('No se pudo regenerar la clave todavía. Inténtalo más tarde.');
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <Glass className="w-full rounded-2xl p-7">
      {/* Encabezado: identidad + plan */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-text-muted">Cuenta</p>
          <p className="truncate text-lg font-semibold text-text-primary">{email}</p>
        </div>
        <span className="shrink-0 rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
          Plan {planLabel(user.planId)}
        </span>
      </div>

      {/* userKey */}
      <div className="mt-7">
        <div className="mb-2 flex items-center gap-2 text-text-secondary">
          <KeyRound size={16} className="text-accent" />
          <span className="text-sm font-medium">Tu clave de acceso (app de escritorio)</span>
        </div>

        {userKey ? (
          <>
            <div className="flex items-center gap-2 rounded-xl border border-border-strong bg-bg-inset px-3 py-2.5">
              <code
                className={cn(
                  'flex-1 truncate font-mono text-xs text-text-primary',
                  !revealed && 'select-none',
                )}
              >
                {revealed ? userKey : '•'.repeat(28)}
              </code>
              <button
                type="button"
                onClick={() => setRevealed((v) => !v)}
                aria-label={revealed ? 'Ocultar clave' : 'Mostrar clave'}
                className="rounded-md p-1.5 text-text-secondary transition-colors hover:text-text-primary"
              >
                {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copiar clave"
                className="rounded-md p-1.5 text-text-secondary transition-colors hover:text-accent"
              >
                {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              </button>
            </div>
            <p className="mt-2 text-xs text-text-muted">
              Úsala para iniciar sesión en la app de escritorio. Mantenla en secreto.
            </p>
          </>
        ) : (
          <div className="rounded-xl border border-border-strong bg-bg-inset px-3 py-2.5 text-xs text-text-muted">
            Tu clave aún no está disponible. Se habilitará cuando el backend genere la userKey.
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Button
          variant="secondary"
          onClick={handleRegenerate}
          disabled={regenerating}
          className="text-sm"
        >
          <RefreshCw size={14} className={cn(regenerating && 'animate-spin-slow')} />
          {regenerating ? 'Regenerando…' : userKey ? 'Regenerar clave' : 'Generar clave'}
        </Button>
        <Button
          variant="ghost"
          onClick={() => void signOut({ redirectUrl: '/sign-in' })}
          className="text-sm"
        >
          <LogOut size={14} />
          Cerrar sesión
        </Button>
      </div>
    </Glass>
  );
}
