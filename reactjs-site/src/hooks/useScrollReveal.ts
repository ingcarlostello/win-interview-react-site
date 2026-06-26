import { useEffect, useRef, useState, type RefObject } from 'react';

type RevealOptions = { threshold?: number; rootMargin?: string };

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
): { ref: RefObject<T | null>; visible: boolean } {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}
