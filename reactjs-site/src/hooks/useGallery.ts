import { useCallback, useEffect, useState } from 'react';

export function useGallery(total: number, autoplayMs: number): {
  index: number;
  goTo: (i: number) => void;
  next: () => void;
  prev: () => void;
} {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (i: number) => {
      if (total <= 0) return;
      setIndex(((i % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (total <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [total, autoplayMs]);

  return { index, goTo, next, prev };
}
