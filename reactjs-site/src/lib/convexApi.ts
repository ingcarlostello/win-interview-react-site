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

// Información de suscripción de Paddle. Nombres alineados con lo que devuelve
// `users:getCurrentUserSubscription` (campos de la tabla `users`).
export interface SubscriptionInfo {
  planId: string;
  paddleStatus?: string | null; // "active" | "trialing" | "past_due" | "canceled" | ...
  paddleSubscriptionId?: string | null;
  paddleCancelUrl?: string | null;
  paddleUpdatePaymentUrl?: string | null;
  subscriptionCurrentPeriodEnd?: string | null; // ISO 8601
  // Cancelación pendiente (scheduled_change nativo de Paddle): action "cancel".
  scheduledChangeAction?: string | null;
  scheduledChangeEffectiveAt?: string | null;
  // Downgrade programado (gestionado por la app).
  pendingPlanId?: string | null;
  pendingPlanEffectiveAt?: string | null;
}

// Suscripción del usuario autenticado (null si no tiene plan de pago).
export const getCurrentUserSubscriptionRef = makeFunctionReference<
  'query',
  NoArgs,
  SubscriptionInfo | null
>('users:getCurrentUserSubscription');

// --- Acciones del portal de facturación (llaman a la API de Paddle) ---

export interface PlanChangeResult {
  ok: boolean;
  direction: 'upgrade' | 'downgrade' | 'none';
  effectiveAt?: string | null;
}

// Upgrade (inmediato con prorrateo) o downgrade (programado al final del ciclo).
export const changeSubscriptionPlanRef = makeFunctionReference<
  'action',
  { planId: string },
  PlanChangeResult
>('paddle:changeSubscriptionPlan');

export interface PreviewResult {
  immediateAmount: string | null; // menor denominación (centavos), como string
  currencyCode: string | null;
  nextBilledAt: string | null;
}

// Previsualiza el prorrateo de un cambio de plan sin aplicarlo.
export const previewSubscriptionChangeRef = makeFunctionReference<
  'action',
  { planId: string },
  PreviewResult
>('paddle:previewSubscriptionChange');

// Cancela al final del ciclo (mantiene acceso hasta effectiveAt).
export const cancelSubscriptionRef = makeFunctionReference<
  'action',
  NoArgs,
  { ok: boolean; effectiveAt: string | null }
>('paddle:cancelSubscription');

// Reactiva durante la gracia (quita la cancelación programada).
export const reactivateSubscriptionRef = makeFunctionReference<'action', NoArgs, { ok: boolean }>(
  'paddle:reactivateSubscription',
);

// Devuelve un transactionId para actualizar el método de pago (overlay Paddle.js).
export const updatePaymentMethodRef = makeFunctionReference<
  'action',
  NoArgs,
  { transactionId: string }
>('paddle:updatePaymentMethod');

// Crea una transacción de Paddle para el plan indicado (lite/pro/ultra) y
// devuelve su `transactionId` para abrir el overlay de Paddle.js. Requiere
// sesión: el backend deriva el usuario de la identidad de Clerk.
export const createCheckoutRef = makeFunctionReference<
  'action',
  { planId: string },
  { transactionId: string }
>('paddle:createCheckout');
