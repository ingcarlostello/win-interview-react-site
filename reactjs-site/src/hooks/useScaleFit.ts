import { useEffect, useRef, useState, type RefObject } from 'react';
import { calcScaleFit } from '@/helpers/scale-fit.helper';

export function useScaleFit(contentWidth: number, contentHeight: number): {
  ref: RefObject<HTMLDivElement | null>;
  scale: number;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const { scale: next } = calcScaleFit(rect.width, rect.height, contentWidth, contentHeight);
      setScale(next);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [contentWidth, contentHeight]);

  return { ref, scale };
}
