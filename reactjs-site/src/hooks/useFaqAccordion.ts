import { useCallback, useState } from 'react';

export function useFaqAccordion(): {
  openIndex: number | null;
  toggle: (i: number) => void;
} {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback(
    (i: number) => {
      setOpenIndex((current) => (current === i ? null : i));
    },
    [],
  );

  return { openIndex, toggle };
}
