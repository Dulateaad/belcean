'use client';

import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDictionary } from '@/contexts/dictionary-context';
import { useParams } from 'next/navigation';

export function ServicesCalculateCta() {
  const t = useDictionary();
  const params = useParams();
  const locale = (params.locale as string) || 'ru';

  return (
    <div className="mt-12 flex w-full max-w-xl flex-col items-center gap-3 px-2 sm:mt-14">
      <p className="text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
        {t.HomePage.services_calculate_hint}
      </p>
      <Button
        asChild
        size="lg"
        className="h-auto w-full gap-2 rounded-2xl bg-emerald-600 px-8 py-5 text-base font-bold text-white shadow-lg hover:bg-emerald-700 sm:py-6 sm:text-lg"
      >
        <Link href={`/${locale}/calculator`}>
          <Calculator className="h-6 w-6 shrink-0 opacity-95" />
          {t.HomePage.calculate_button}
        </Link>
      </Button>
    </div>
  );
}
