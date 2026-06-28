# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference

**Tech Stack:** React 19 + Vite + TypeScript + Tailwind v3 + Clerk (auth) + Convex (backend)

**Common Commands:**
```bash
# Development
pnpm dev              # Start Vite dev server (localhost:5174)
pnpm typecheck        # TypeScript type checking (no emit)
pnpm lint             # Run ESLint

# Building
pnpm build            # TypeScript check + Vite build to dist/
pnpm preview          # Preview production build locally
```

---

## Architecture Overview

### Frontend (This Repo)

A **React 19 + Vite** marketing site with two distinct sections:

1. **Marketing Landing Page** (`src/pages/HomePage.tsx`, `src/components/sections/`)
   - Hero, features, gallery, pricing, FAQ, social proof
   - Public pages: Terms, Privacy, Refunds
   - Layout: [Header](src/components/layout/Header.tsx) + [Footer](src/components/layout/Footer.tsx)

2. **Authentication & Dashboard** (Added in latest work)
   - **Sign In/Up Pages:** `src/pages/SignInPage.tsx`, `src/pages/SignUpPage.tsx`
     - Embedded Clerk components (`<SignIn>`, `<SignUp>`)
     - Styled with Clerk appearance theme ([clerkAppearance.ts](src/components/dashboard/clerkAppearance.ts))
     - Redirect to `/dashboard` on success
   - **Dashboard Page:** `src/pages/DashboardPage.tsx`
     - Protected route (redirects unauthenticated users to sign-in)
     - Shows user email, plan badge, and userKey (token for Tauri desktop app login)
     - [UserKeyCard](src/components/dashboard/UserKeyCard.tsx) component with copy/regenerate/logout actions
     - [EnsureConvexUser](src/components/dashboard/EnsureConvexUser.tsx) ensures user record exists on first visit

### Backend (Separate Repo)

The Convex backend is **not in this repository**—it lives in another project (`interview-copilot`). This frontend calls pre-deployed backend functions via `makeFunctionReference` pattern (see [src/lib/convexApi.ts](src/lib/convexApi.ts)).

The backend provides:
- `users:storeUser` (mutation) — creates/updates the current user record
- `users:getCurrentUser` (query) — fetches the current user (email, plan, userKey)
- `users:regenerateUserKey` (mutation) — generates a new userKey token
- Other functions: quotas, prompts, Paddle webhooks (not used by this dashboard yet)

**Key gotcha:** Do NOT run `npx convex dev` or `convex deploy` from this repo. The backend schema and functions live elsewhere. Running these commands would delete/overwrite the deployed backend because this repo's `convex/` directory is either empty or incomplete.

### Two-Environment Setup

| Environment | Convex Deployment | Clerk Issuer | Dev/Prod |
|-------------|-------------------|--------------|----------|
| **Dev** | `qualified-cuttlefish-550` | `infinitiate-quail-91.clerk.accounts.dev` | Test/sandbox |
| **Prod** | `unique-jaguar-230` | `clerk.wininterview.xyz` | Live |

**Frontend environment variables:**
- `.env.local` — used by `pnpm dev`, points to dev Convex + dev Clerk
- `.env.production` — used by production builds, points to prod Convex + prod Clerk

The `VITE_*` prefix makes them available to the browser; backend-only keys go unprefixed (and are never exposed).

---

## Key Patterns & Decisions

### makeFunctionReference (Backend Integration)

Instead of importing `api` from `convex/_generated`, this repo uses **`makeFunctionReference`** to reference already-deployed functions by name:

```ts
// src/lib/convexApi.ts
export const storeUserRef = makeFunctionReference<'mutation', NoArgs, unknown>(
  'users:storeUser'
);
export const getCurrentUserRef = makeFunctionReference<'query', NoArgs, DashboardUser | null>(
  'users:getCurrentUser'
);
```

**Why:** The backend source is in another repo, so regenerating `convex/_generated` here would clobber the deployed backend. This pattern lets the frontend call deployed functions safely.

**When to change:** Only if the backend moves into this repo, and you generate the full `convex/_generated` schema. Then replace `makeFunctionReference` calls with direct `api.*` imports.

### Design Tokens (Tailwind)

Custom Tailwind colors and sizes are defined via CSS variables (set in the theme, e.g., `var(--color-accent)`) and referenced in [tailwind.config.ts](tailwind.config.ts). The actual values come from runtime CSS (likely in a global stylesheet or theme provider).

Common tokens in use:
- **Accent colors:** `accent`, `accent-hover`, `accent-soft`, `accent-glow` (lime green, #a3e635)
- **Background layers:** `bg-base`, `bg-elev-1`, `bg-elev-2`, `bg-elev-3`, `bg-inset`
- **Text:** `text-primary`, `text-secondary`, `text-muted`
- **Borders:** `border`, `border-strong`, `border-danger`
- **Status:** `success`, `danger` (with `-soft` variants)

See [src/contexts/ThemeProvider.tsx](src/contexts/ThemeProvider.tsx) for theme switching (dark mode support).

### Clerk Integration

[ClerkProvider](src/main.tsx) wraps the entire app. Provides:
- `useUser()` — current user info
- `useClerk()` — sign-out, etc.
- `<SignedIn>/<SignedOut>` — conditional rendering based on auth state
- Auth tokens in Convex context (via `ConvexProviderWithClerk`)

The Clerk appearance is customized in [clerkAppearance.ts](src/components/dashboard/clerkAppearance.ts) with dark theme + lime accent.

### Convex Queries & Mutations (Frontend)

Use `useMutation()` and `useQuery()` from `convex/react`:

```tsx
const user = useQuery(getCurrentUserRef, {});           // reactive query
const regenerate = useMutation(regenerateUserKeyRef);   // mutation function
await regenerate({});                                    // call it
```

`useQuery` returns `undefined` while loading, `null` if no data, or the actual data. Guard loading states explicitly:
```tsx
if (user === undefined) return <Spinner />;        // loading
if (user === null) return <div>No user found</div>; // no data
return <div>{user.email}</div>;                     // has data
```

---

## Directory Structure (Highlights)

```
src/
├── main.tsx                      # App entry, provider wiring (Clerk, Convex, theme)
├── App.tsx                       # Route definitions
├── lib/
│   └── convexApi.ts             # makeFunctionReference definitions (backend API)
├── constants/
│   └── routes.constants.ts       # Route paths (SIGN_IN, SIGN_UP, DASHBOARD, etc.)
├── contexts/
│   ├── ThemeProvider.tsx         # Dark/light theme toggle
│   └── LanguageProvider.tsx      # i18n (es/en)
├── helpers/
│   └── cn.ts                     # clsx + tailwind-merge utility
├── components/
│   ├── ui/                       # Base components (Button, Glass, Container, etc.)
│   ├── layout/                   # Header, Footer, MobileMenu, Layout (marketing shell)
│   ├── sections/                 # Marketing sections (Hero, Features, Pricing, etc.)
│   ├── cards/                    # Card components (FeatureCard, PricingCard, etc.)
│   ├── hero/                     # HeroMockup, etc.
│   ├── gallery/                  # App screenshot carousel
│   ├── legal/                    # Legal page layout components
│   └── dashboard/                # NEW: Clerk appearance, UserKeyCard, EnsureConvexUser
├── pages/
│   ├── HomePage.tsx              # Marketing landing page
│   ├── TermsPage.tsx, PrivacyPage.tsx, RefundsPage.tsx
│   ├── SignInPage.tsx            # NEW: Clerk SignIn component
│   ├── SignUpPage.tsx            # NEW: Clerk SignUp component
│   └── DashboardPage.tsx         # NEW: Protected dashboard (email, plan, userKey)
└── vite-env.d.ts                 # TypeScript env var declarations

convex/
└── _generated/                   # DO NOT EDIT: generated by backend repo's `convex deploy`
    └── ai/
        └── ai-files.state.json   # State file for Convex AI skill
```

---

## Important Gotchas & Considerations

### Backend is External

- **Source code:** The Convex backend source (`schema.ts`, `users.ts`, etc.) lives in another repo.
- **This repo:** Only has `convex/_generated/ai/` (metadata).
- **Do not run:** `npx convex dev`, `convex deploy`, `convex push`, etc. from this directory.
- **If you need to add backend functions:** Edit the backend repo, deploy there, then reference them here via `makeFunctionReference`.

### userKey Implementation (Pending Backend)

The [UserKeyCard](src/components/dashboard/UserKeyCard.tsx) component displays a `userKey` field if it exists, with copy/regenerate/logout actions. The backend must add:
1. `userKey` column to the `users` table
2. `generateUserKey()` function (crypto-based token with env-specific prefix: `wik_test_*` or `wik_live_*`)
3. `regenerateUserKey` mutation
4. Initial userKey generation in `storeUser` / user creation

Until the backend implements this, the UI gracefully shows "Your key will be available soon."

### Environment Variable Mismatches

- **Dev:** publishable key `pk_test_...` must match Clerk dev instance; VITE_CONVEX_URL must point to `qualified-cuttlefish-550.convex.cloud`
- **Prod:** publishable key `pk_live_...` must match Clerk prod instance; VITE_CONVEX_URL must point to `unique-jaguar-230.convex.cloud`
- **Danger:** Mixing test keys with prod Convex (or vice versa) will cause authentication failures.

### Convex Deployment Configuration (Prod Only)

Before deploying the backend to `unique-jaguar-230` (prod), ensure these environment variables are set in the Convex deployment dashboard:
- `CLERK_ISSUER_URL=https://clerk.wininterview.xyz`
- `CLERK_SECRET_KEY=sk_live_...` (Clerk prod secret key)
- `APP_ENV=live` (so userKey uses `wik_live_` prefix)

---

## Running Tests & Linting

This repo does **not have a test suite yet**. When adding tests:
- Use Vitest (Vite's test runner) or Jest
- Place tests next to components: `Component.test.tsx`
- Run via `pnpm test` (script to be added to `package.json`)

**Lint and typecheck before committing:**
```bash
pnpm typecheck && pnpm lint
```

Both must pass in CI.

---

## Convex AI Guidelines

When working with Convex code, read `convex/_generated/ai/guidelines.md` first for current best practices. Install agent skills:
```bash
npx convex ai-files install
```

These skills provide templates for queries, mutations, schema patterns, etc.

---

## Quick Debugging

- **Clerk issues:** Check `.env.local` for correct `VITE_CLERK_PUBLISHABLE_KEY`; verify JWT template `convex` exists in Clerk dashboard
- **Convex connection:** `VITE_CONVEX_URL` should match the deployment; check Convex dashboard for URL
- **CSS not loading:** Ensure Tailwind is building (check `global.css` or root stylesheet); check terminal for CSS build errors
- **userKey not showing:** Confirm the backend has added the column and implemented `getCurrentUser` to return it; check Convex Data browser
- **Dev server crashes:** Check for port conflicts (Vite default: 5174); try `pnpm dev --port 3000` if needed

---

## Deployment Checklist

- [ ] `.env.local` / `.env.production` have correct keys for target environment
- [ ] Backend has implemented `userKey` and `regenerateUserKey` (if using those features)
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds (produces `dist/` folder)
- [ ] Backend deployment (`unique-jaguar-230`) has `CLERK_ISSUER_URL`, `CLERK_SECRET_KEY`, `APP_ENV=live`
- [ ] Clerk prod instance is configured with the correct redirect URLs
