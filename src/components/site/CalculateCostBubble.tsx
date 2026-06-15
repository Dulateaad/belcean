'use client';

import { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';
import { useQuoteFlow } from '@/components/site/quote-flow';
import { cn } from '@/lib/utils';

const DELAY_MS = 8_000;

export function CalculateCostBubble() {
  const t = useDictionary();
  const info = t.InfoModal;
  const { openQuote } = useQuoteFlow();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-3 left-3 z-50 duration-500 animate-in fade-in slide-in-from-bottom-4 md:bottom-24 md:left-auto md:right-24',
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <button
        type="button"
        onClick={openQuote}
        className="flex h-10 items-center gap-2 rounded-full bg-white/95 px-4 text-sm font-semibold text-emerald-700 shadow-lg ring-1 ring-emerald-600/20 backdrop-blur-sm transition-transform active:scale-95 hover:bg-white hover:shadow-xl"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
          <Info className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        <span>{info.open_button}</span>
      </button>
    </div>
  );
}
