export interface NavLink {
  href: string;
  labelKey: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { href: '/#features', labelKey: 'nav.features' },
  { href: '/#how', labelKey: 'nav.how' },
  { href: '/#pricing', labelKey: 'nav.pricing' },
  { href: '/#faq', labelKey: 'nav.faq' },
] as const;

export interface FooterLink {
  href: string;
  labelKey: string;
}

export const FOOTER_LINKS: readonly FooterLink[] = [
  { href: '/#features', labelKey: 'nav.features' },
  { href: '/#pricing', labelKey: 'nav.pricing' },
  { href: '/#faq', labelKey: 'nav.faq' },
  { href: '/terms', labelKey: 'footer.terms' },
  { href: '/privacy', labelKey: 'footer.privacy' },
  { href: '/refunds', labelKey: 'footer.refunds' },
] as const;
