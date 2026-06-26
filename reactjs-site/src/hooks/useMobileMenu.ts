import { useCallback, useState } from 'react';
import { lockBodyScroll } from '@/helpers/dom.helper';

export function useMobileMenu(): {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
} {
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = useCallback((next: boolean) => {
    setIsOpen(next);
    lockBodyScroll(next);
  }, []);

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  return { isOpen, open, close, toggle };
}
