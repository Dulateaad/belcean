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
    <div className="mx-auto mt-12 flex w-full max-w-xl flex-col items-center justify-center gap-3 px-2 text-center sm:mt-14">
      <p className="w-full text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
        {t.HomePage.services_calculate_hint}
      </p>
      <Button
        asChild
        size="lg"
        className="mx-auto h-auto w-full max-w-md gap-2 rounded-2xl bg-emerald-600 px-8 py-5 text-base font-bold text-white shadow-lg hover:bg-emerald-700 sm:py-6 sm:text-lg"
      >
        <Link href={`/${locale}/calculator`} className="justify-center">
          <Calculator className="h-6 w-6 shrink-0 opacity-95" />
          {t.HomePage.calculate_button}
        </Link>
      </Button>
    </div>
  );
}
