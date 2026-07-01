import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Glass } from '@/components/ui/Glass';
import { SUPPORT_EMAIL } from '@/constants/contact.constants';
import { ROUTES } from '@/constants/routes.constants';

export function ContactPage() {
  const { t } = useLanguage();

  const rows: readonly { label: string; value: string }[] = [
    { label: t('contact.response.label'), value: t('contact.response.value') },
    { label: t('contact.entity.label'), value: t('contact.entity.value') },
    { label: t('contact.jurisdiction.label'), value: t('contact.jurisdiction.value') },
  ];

  return (
    <div className="pt-20">
      <section className="relative px-0 pt-20 pb-12 text-center">
        <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[400px] w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,var(--color-accent-soft)_0%,transparent_60%)]" />
        <Container className="relative z-[1]">
          <SectionLabel labelKey="contact.label" />
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold">{t('contact.title')}</h1>
          <p className="mx-auto mt-3 max-w-xl text-[0.95rem] text-text-secondary">
            {t('contact.subtitle')}
          </p>
        </Container>
      </section>

      <Container className="max-w-2xl pb-24">
        <Glass className="rounded-default p-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
              {t('contact.email.label')}
            </span>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-2 block text-[clamp(1.25rem,3vw,1.75rem)] font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>

          <dl className="mt-8 divide-y divide-border border-t border-border">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-[0.9rem] text-text-muted">{row.label}</dt>
                <dd className="text-[0.9rem] font-medium text-text-primary">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 rounded-xs border border-border bg-bg-inset px-5 py-4">
            <h2 className="text-[0.95rem] font-semibold text-text-primary">
              {t('contact.billing.title')}
            </h2>
            <p className="mt-1.5 text-[0.85rem] leading-relaxed text-text-secondary">
              {t('contact.billing.text')}{' '}
              <Link to={ROUTES.REFUNDS} className="text-accent hover:text-accent-hover">
                {t('footer.refunds')}
              </Link>
            </p>
          </div>
        </Glass>
      </Container>
    </div>
  );
}
