import { Navigate } from 'react-router-dom';
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';
import { getCurrentUserRef } from '@/lib/convexApi';
import { ROUTES } from '@/constants/routes.constants';
import { EnsureConvexUser } from '@/components/dashboard/EnsureConvexUser';
import { AccountHeader } from '@/components/dashboard/AccountHeader';
import { UserKeyCard } from '@/components/dashboard/UserKeyCard';
import { CreditsOverview } from '@/components/dashboard/CreditsOverview';
import { BillingContainer } from '@/components/billing/BillingContainer';

function Spinner({ label }: { label: string }) {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3 text-text-secondary">
      <Loader2 size={28} className="animate-spin-slow text-accent" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

function DashboardContent() {
  // `undefined` = cargando la query; `null` = aún sin documento (storeUser en curso).
  const user = useQuery(getCurrentUserRef, {});

  return (
    <div className="w-full max-w-3xl">
      <EnsureConvexUser />
      {user == null ? (
        <Spinner label="Preparando tu cuenta…" />
      ) : (
        <>
          <AccountHeader email={user.email ?? ''} planId={user.planId} />
          <div className="mt-6">
            <CreditsOverview planId={user.planId} />
          </div>
          <div className="mt-6">
            <UserKeyCard user={user} />
          </div>
          <BillingContainer planId={user.planId} />
        </>
      )}
    </div>
  );
}

export function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-bg-base px-6 py-12 md:py-16">
      <AuthLoading>
        <Spinner label="Cargando…" />
      </AuthLoading>
      <Unauthenticated>
        <Navigate to={ROUTES.SIGN_IN} replace />
      </Unauthenticated>
      <Authenticated>
        <DashboardContent />
      </Authenticated>
    </main>
  );
}
