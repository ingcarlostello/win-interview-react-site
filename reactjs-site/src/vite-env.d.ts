/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONVEX_URL: string;
  readonly VITE_CONVEX_SITE_URL: string;
  readonly VITE_CLERK_PUBLISHABLE_KEY: string;
  // Token público de Paddle.js para el navegador (formato test_*/live_*).
  readonly VITE_PADDLE_CLIENT_TOKEN: string;
  // Entorno de Paddle.js: 'sandbox' en dev, 'production' en prod.
  readonly VITE_PADDLE_ENVIRONMENT: 'sandbox' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
