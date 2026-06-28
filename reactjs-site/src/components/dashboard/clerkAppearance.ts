// Tema oscuro/lima para los componentes embebidos de Clerk (<SignIn>, <SignUp>),
// alineado con los tokens de diseño del proyecto (systemDesign.txt).
// Se infiere el tipo; Clerk valida la forma en la prop `appearance`.
export const clerkAppearance = {
  variables: {
    colorPrimary: '#a3e635',
    colorBackground: '#0d0f14',
    colorText: '#f5f5f7',
    colorTextSecondary: '#a1a1aa',
    colorInputBackground: '#13161d',
    colorInputText: '#f5f5f7',
    colorDanger: '#ef4444',
    colorSuccess: '#22c55e',
    borderRadius: '12px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  elements: {
    rootBox: 'w-full',
    card: 'bg-bg-elev-1 border border-border-strong shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]',
    headerTitle: 'text-text-primary',
    headerSubtitle: 'text-text-secondary',
    socialButtonsBlockButton: 'border border-border-strong text-text-primary hover:bg-bg-elev-2',
    formButtonPrimary:
      'bg-accent text-[#0a0a0a] font-semibold hover:bg-accent-hover shadow-[0_0_20px_var(--color-accent-glow)] normal-case',
    formFieldInput: 'bg-bg-elev-2 border border-border-strong text-text-primary',
    footerActionLink: 'text-accent hover:text-accent-hover',
    identityPreviewEditButton: 'text-accent',
  },
};
