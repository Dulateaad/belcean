'use client';

import { useQuoteFlow } from '@/components/site/quote-flow';
import { cn } from '@/lib/utils';

export function OpenFormButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { openForm } = useQuoteFlow();

  return (
    <button
      type="button"
      onClick={openForm}
      className={cn(
        'inline-flex items-center font-semibold text-primary opacity-70 transition-opacity hover:opacity-100',
        className,
      )}
    >
      {children}
    </button>
  );
}
