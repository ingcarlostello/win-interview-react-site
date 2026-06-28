import { SignUp } from '@clerk/clerk-react';
import { ROUTES } from '@/constants/routes.constants';
import { clerkAppearance } from '@/components/dashboard/clerkAppearance';

export function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-base px-6 py-12">
      <SignUp
        routing="path"
        path={ROUTES.SIGN_UP}
        signInUrl={ROUTES.SIGN_IN}
        forceRedirectUrl={ROUTES.DASHBOARD}
        appearance={clerkAppearance}
      />
    </main>
  );
}
