import { useEffect, useState } from 'react';
import type { Paddle } from '@paddle/paddle-js';
import { loadPaddle } from '@/lib/paddle';

// Devuelve la instancia de Paddle.js una vez inicializada (o `undefined`
// mientras carga / si falta el token). Dispara la carga perezosa de Paddle.js.
export function usePaddle(): Paddle | undefined {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    let active = true;
    loadPaddle().then((p) => {
      if (active && p) setPaddle(p);
    });
    return () => {
      active = false;
    };
  }, []);

  return paddle;
}
