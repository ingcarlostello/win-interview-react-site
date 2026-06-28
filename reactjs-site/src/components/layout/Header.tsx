import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { NAV_LINKS } from '@/constants/nav.constants';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrolled } from '@/hooks/useScrolled';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { ROUTES, SECTIONS } from '@/constants/routes.constants';
import { Container } from '@/components/ui/Container';
import { LangToggle } from '@/components/ui/LangToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { IconBtn } from '@/components/ui/IconBtn';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/helpers/cn';

export function Header() {
  const { t } = useLanguage();
  const scrolled = useScrolled(20);
  const menu = useMobileMenu();

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[100] transition-all duration-300 ease-glass py-4',
          scrolled &&
            'bg-bg-base backdrop-blur-2xl border-b border-border py-2.5 [[data-theme=glass]_&]:bg-[rgb(20_22_30/0.72)]',
        )}
      >
        <Container>
          <div className="flex items-center justify-between gap-6">
            <Link to={ROUTES.HOME} className="flex items-center gap-2.5 font-extrabold text-[1.15rem] tracking-[-0.02em]">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-accent text-xl shadow-[0_0_16px_var(--color-accent-glow)]">
                🎯
              </span>
              <span>wininterview</span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="rounded-xs px-4 py-2 text-[0.9rem] font-medium text-text-secondary transition-all duration-200 ease-out hover:text-text-primary hover:bg-bg-elev-2"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex">
                <LangToggle />
              </div>
              <ThemeToggle className="hidden md:flex" />
              <SignedOut>
                <Link
                  to={ROUTES.SIGN_IN}
                  className="hidden md:inline-flex rounded-xs px-4 py-2 text-[0.9rem] font-medium text-text-secondary transition-all duration-200 ease-out hover:text-text-primary hover:bg-bg-elev-2"
                >
                  {t('nav.cta')}
                </Link>
              </SignedOut>
              <SignedIn>
                <Button
                  as="a"
                  href={ROUTES.DASHBOARD}
                  variant="secondary"
                  className="hidden md:inline-flex"
                >
                  Dashboard
                </Button>
              </SignedIn>
              <Button
                as="a"
                href={SECTIONS.PRICING}
                variant="primary"
                className="hidden md:inline-flex"
              >
                {t('nav.cta')}
              </Button>
              <IconBtn
                className="md:!hidden flex"
                onClick={menu.open}
                title="Menu"
                aria-label="Open menu"
              >
                ☰
              </IconBtn>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={menu.isOpen} close={menu.close} />
    </>
  );
}
