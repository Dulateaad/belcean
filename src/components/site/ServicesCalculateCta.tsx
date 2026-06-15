'use client';

import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDictionary } from '@/contexts/dictionary-context';
import { useQuoteFlow } from '@/components/site/quote-flow';

export function ServicesCalculateCta() {
  const t = useDictionary();
  const { openForm } = useQuoteFlow();

  return (
    <div className="mt-12 flex w-full max-w-xl flex-col items-center gap-3 px-2 sm:mt-14">
      <p className="text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
        {t.HomePage.services_calculate_hint}
      </p>
      <Button
        type="button"
        size="lg"
        onClick={openForm}
        className="h-auto w-full gap-2 rounded-2xl bg-emerald-600 px-8 py-5 text-base font-bold text-white shadow-lg hover:bg-emerald-700 sm:py-6 sm:text-lg"
      >
        <Calculator className="h-6 w-6 shrink-0 opacity-95" />
        {t.HomePage.calculate_button}
      </Button>
    </div>
  );
}
