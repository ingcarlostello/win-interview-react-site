import { SignIn } from '@clerk/clerk-react';
import { ROUTES } from '@/constants/routes.constants';
import { clerkAppearance } from '@/components/dashboard/clerkAppearance';

export function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-base px-6 py-12">
      <SignIn
        routing="path"
        path={ROUTES.SIGN_IN}
        signUpUrl={ROUTES.SIGN_UP}
        forceRedirectUrl={ROUTES.DASHBOARD}
        appearance={clerkAppearance}
      />
    </main>
  );
}
