import { useLayoutEffect, useRef, useState } from 'react';
import { Glass } from '@/components/ui/Glass';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';

interface FaqItemProps {
  questionKey: string;
  answerKey: string;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function FaqItem({ questionKey, answerKey, isOpen, onToggle, className }: FaqItemProps) {
  const { t } = useLanguage();
  const answerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useLayoutEffect(() => {
    const node = answerRef.current;
    if (isOpen && node) {
      setMaxHeight(`${node.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen]);

  return (
    <Glass elevated className={cn('overflow-hidden rounded-sm mb-3', className)}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-6 py-5 text-left text-base font-semibold text-text-primary transition-colors duration-200 hover:text-accent"
      >
        <span>{t(questionKey)}</span>
        <span
          className={cn(
            'ml-4 flex-shrink-0 text-[1.5rem] text-accent transition-transform duration-300 ease-glass',
            isOpen && 'rotate-45',
          )}
        >
          +
        </span>
      </button>
      <div className="overflow-hidden transition-[max-height] duration-400 ease-glass" style={{ maxHeight }}>
        <div ref={answerRef}>
          <p className="px-6 pb-5 text-[0.95rem] leading-relaxed text-text-secondary">
            {t(answerKey)}
          </p>
        </div>
      </div>
    </Glass>
  );
}
