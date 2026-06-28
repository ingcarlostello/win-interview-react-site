import { useEffect, useRef } from 'react';
import { useConvexAuth, useMutation } from 'convex/react';
import { storeUserRef } from '@/lib/convexApi';

/**
 * Llama una vez a `users.storeUser` cuando Convex confirma la autenticación,
 * para asegurar que exista la fila del usuario actual (el webhook de Clerk ya la
 * crea normalmente; esto es un respaldo). No renderiza nada.
 */
export function EnsureConvexUser() {
  const { isAuthenticated } = useConvexAuth();
  const storeUser = useMutation(storeUserRef);
  const ran = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || ran.current) return;
    ran.current = true;
    void storeUser({}).catch((err) => {
      ran.current = false;
      console.error('storeUser falló:', err);
    });
  }, [isAuthenticated, storeUser]);

  return null;
}
