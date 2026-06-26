import { Link } from 'react-router-dom';
import { NAV_LINKS } from '@/constants/nav.constants';
import { SECTIONS } from '@/constants/routes.constants';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/Button';
import { LangToggle } from '@/components/ui/LangToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/helpers/cn';

interface MobileMenuProps {
  isOpen: boolean;
  close: () => void;
}

export function MobileMenu({ isOpen, close }: MobileMenuProps) {
  const { t } = useLanguage();

  return (
    <>
      <div
        onClick={close}
        className={cn(
          'fixed inset-0 z-[150] bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      />
      <aside
        className={cn(
          'fixed right-0 top-0 z-[200] flex h-screen w-[280px] flex-col gap-2 bg-bg-elev-1 backdrop-blur-2xl border-l border-border-strong p-6 transition-transform duration-300 ease-glass',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <button
          onClick={close}
          className="self-end mb-4 text-[1.5rem] text-text-secondary"
          aria-label="Close menu"
        >
          ✕
        </button>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            onClick={close}
            className="rounded-xs px-4 py-3.5 font-medium text-text-secondary transition-all duration-200 ease-out hover:bg-bg-elev-2 hover:text-text-primary"
          >
            {t(link.labelKey)}
          </Link>
        ))}
        <Button
          as="a"
          href={SECTIONS.PRICING}
          variant="primary"
          className="mt-3"
          onClick={close}
        >
          {t('nav.cta')}
        </Button>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6 border-t border-border">
          <LangToggle />
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
