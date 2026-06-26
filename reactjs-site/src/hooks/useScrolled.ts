import { useEffect, useRef, useState } from 'react';

export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y !== lastY.current) {
        lastY.current = y;
        setScrolled(y > threshold);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
