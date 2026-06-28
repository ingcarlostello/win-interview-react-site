import { initializePaddle, type Paddle } from '@paddle/paddle-js';

// Inicializa Paddle.js una sola vez (singleton). Se llama de forma perezosa
// desde `usePaddle`, así que Paddle.js solo se carga cuando el usuario entra a
// una página que lo necesita (p. ej. /upgrade), no en toda la app.
let paddlePromise: Promise<Paddle | undefined> | null = null;

export function loadPaddle(): Promise<Paddle | undefined> {
  if (!paddlePromise) {
    const token = import.meta.env.VITE_PADDLE_CLIENT_TOKEN;
    const environment = import.meta.env.VITE_PADDLE_ENVIRONMENT;
    if (!token) {
      console.warn('[Paddle] VITE_PADDLE_CLIENT_TOKEN no configurado');
      return Promise.resolve(undefined);
    }
    paddlePromise = initializePaddle({ environment, token });
  }
  return paddlePromise;
}
