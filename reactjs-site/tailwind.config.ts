import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          press: 'var(--color-accent-press)',
          soft: 'var(--color-accent-soft)',
          'soft-2': 'var(--color-accent-soft-2)',
          glow: 'var(--color-accent-glow)',
          border: 'var(--color-accent-border)',
        },
        bg: {
          base: 'var(--color-bg-base)',
          'elev-1': 'var(--color-bg-elev-1)',
          'elev-2': 'var(--color-bg-elev-2)',
          'elev-3': 'var(--color-bg-elev-3)',
          inset: 'var(--color-bg-inset)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)',
          danger: 'var(--color-border-danger)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          soft: 'var(--color-success-soft)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          soft: 'var(--color-danger-soft)',
        },
        cobalt: 'var(--color-cobalt)',
        magenta: 'var(--color-magenta)',
        amber: 'var(--color-amber)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        xs: 'var(--radius-xs)',
      },
      maxWidth: {
        container: 'var(--max-width)',
        legal: '760px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        glass: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        'dot-pulse': {
          '0%, 80%, 100%': { opacity: '0.4' },
          '40%': { opacity: '1' },
        },
        blink: { '50%': { opacity: '0' } },
        'scan-vertical': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'ghost-pulse': {
          '0%, 100%': {
            boxShadow:
              '0 0 12px rgb(239 68 68 / 0.14), 0 0 30px rgb(239 68 68 / 0.14), inset 0 0 12px rgb(239 68 68 / 0.14)',
          },
          '50%': {
            boxShadow:
              '0 0 20px rgb(239 68 68 / 0.14), 0 0 50px rgb(239 68 68 / 0.14), inset 0 0 20px rgb(239 68 68 / 0.14)',
          },
        },
        'dot-ping': {
          '0%': { boxShadow: '0 0 0 0 currentColor', opacity: '1' },
          '70%': { boxShadow: '0 0 0 6px transparent', opacity: '0.5' },
          '100%': { boxShadow: '0 0 0 0 transparent', opacity: '0' },
        },
      },
      animation: {
        'dot-pulse': 'dot-pulse 1.4s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        'scan-vertical': 'scan-vertical 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        'ghost-pulse': 'ghost-pulse 2s ease-in-out infinite',
        'dot-ping': 'dot-ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
