'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';
import { useQuoteFlow } from '@/components/site/quote-flow';
import { cn } from '@/lib/utils';

const DELAY_MS = 15_000;

export function CalculateCostBubble() {
  const t = useDictionary();
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
        'fixed bottom-24 left-4 right-4 z-40 duration-500 animate-in fade-in slide-in-from-bottom-6 md:left-auto md:right-7 md:max-w-md',
      )}
    >
      <Button
        type="button"
        onClick={openQuote}
        size="lg"
        className="h-auto w-full gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-base font-bold text-white shadow-xl hover:bg-emerald-700"
      >
        <Calculator className="h-6 w-6 shrink-0" />
        <span className="text-left leading-tight">{t.HomePage.calculate_button_long}</span>
      </Button>
    </div>
  );
}
