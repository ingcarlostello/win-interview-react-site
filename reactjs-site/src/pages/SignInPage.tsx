import { SignIn } from '@clerk/clerk-react';
import { useSearchParams } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.constants';
import { clerkAppearance } from '@/components/dashboard/clerkAppearance';

export function SignInPage() {
  // Permite volver a la ruta de origen tras el login (p. ej. /upgrade).
  // Guard anti open-redirect: solo aceptamos rutas internas que empiezan por '/'.
  const [params] = useSearchParams();
  const target = params.get('redirect_url');
  const redirectUrl = target && target.startsWith('/') ? target : ROUTES.DASHBOARD;

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-base px-6 py-12">
      <SignIn
        routing="path"
        path={ROUTES.SIGN_IN}
        signUpUrl={ROUTES.SIGN_UP}
        forceRedirectUrl={redirectUrl}
        appearance={clerkAppearance}
      />
    </main>
  );
}
