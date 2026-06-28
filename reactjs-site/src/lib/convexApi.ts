import { makeFunctionReference } from 'convex/server';

// El código fuente del backend de Convex vive en OTRO repo, así que este sitio
// no genera `convex/_generated/api`. En su lugar referenciamos las funciones ya
// desplegadas por nombre ("modulo:export"). Cuando se compartan los tipos
// generados del backend, esto puede reemplazarse por `import { api }`.

// Forma del documento de usuario que devuelve `users.getCurrentUser`.
// `userKey` es opcional: aparece una vez que el backend añade la columna.
export interface DashboardUser {
  _id: string;
  _creationTime: number;
  clerkId: string;
  tokenIdentifier?: string;
  email?: string;
  name?: string;
  imageUrl?: string;
  planId: string;
  userKey?: string;
}

type NoArgs = Record<string, never>;

// Asegura que exista la fila del usuario actual a partir de la identidad de Clerk.
export const storeUserRef = makeFunctionReference<'mutation', NoArgs, unknown>('users:storeUser');

// Fuente reactiva del dashboard.
export const getCurrentUserRef = makeFunctionReference<'query', NoArgs, DashboardUser | null>(
  'users:getCurrentUser',
);

// Regenera la userKey (función que se añadirá en el repo del backend).
export const regenerateUserKeyRef = makeFunctionReference<'mutation', NoArgs, string>(
  'users:regenerateUserKey',
);

// Forma del documento de cuota (tabla `quotas`). Solo guarda *remaining* por mes;
// el total se calcula en frontend con PLAN_LIMITS. `quotas:getQuota` no declara
// validador de retorno, así que tipamos defensivo. `null` => sin fila este mes.
export interface QuotaData {
  _id: string;
  _creationTime: number;
  userId: string;
  month: string; // "YYYY-MM"
  analysesRemaining: number;
  capturesRemaining: number;
  transcriptionSecondsRemaining: number;
}

// Cuota del mes en curso del usuario autenticado.
export const getQuotaRef = makeFunctionReference<'query', NoArgs, QuotaData | null>(
  'quotas:getQuota',
);

// Información de suscripción de Paddle. El shape de retorno de
// `users:getCurrentUserSubscription` NO está declarado en el backend: estos campos
// reflejan la tabla `users`, pero conviene verificarlos en runtime al integrar.
export interface SubscriptionInfo {
  planId: string;
  status?: string | null; // paddleStatus: "active" | "past_due" | "canceled" | ...
  currentPeriodEnd?: string | null; // ISO 8601
  updatePaymentUrl?: string | null;
  cancelUrl?: string | null;
}

// Suscripción del usuario autenticado (null si no tiene plan de pago).
export const getCurrentUserSubscriptionRef = makeFunctionReference<
  'query',
  NoArgs,
  SubscriptionInfo | null
>('users:getCurrentUserSubscription');

// Crea una transacción de Paddle para el plan indicado (lite/pro/ultra) y
// devuelve su `transactionId` para abrir el overlay de Paddle.js. Requiere
// sesión: el backend deriva el usuario de la identidad de Clerk.
export const createCheckoutRef = makeFunctionReference<
  'action',
  { planId: string },
  { transactionId: string }
>('paddle:createCheckout');
