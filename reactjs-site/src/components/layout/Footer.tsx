import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '@/constants/nav.constants';
import { ROUTES } from '@/constants/routes.constants';
import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-12 mt-auto">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link to={ROUTES.HOME} className="flex items-center gap-2.5 font-extrabold text-[1.15rem] tracking-[-0.02em]">
            <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-accent text-xl shadow-[0_0_16px_var(--color-accent-glow)]">
              🎯
            </span>
            <span>wininterview</span>
          </Link>

          <div className="flex flex-wrap gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-[0.9rem] text-text-secondary transition-colors duration-200 hover:text-accent"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          <p className="text-[0.85rem] text-text-muted">{t('footer.copy')}</p>
        </div>
      </Container>
    </footer>
  );
}
