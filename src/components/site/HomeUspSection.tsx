'use client';

import { useDictionary } from '@/contexts/dictionary-context';
import { Gift, Percent, Stamp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HomeUspSection() {
  const h = useDictionary().HomePage;
  const usp = h.usp;

  return (
    <section id="offers" className="w-full scroll-mt-20 bg-gradient-to-b from-emerald-50/80 to-background py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            {usp.badge}
          </p>
          <h2 className="mt-2 font-headline text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {usp.title}
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">{usp.subtitle}</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Percent className="h-5 w-5" strokeWidth={2.25} />
            </div>
            <h3 className="text-xl font-bold text-foreground">{usp.first_discount_title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {usp.first_discount_desc}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Gift className="h-5 w-5" strokeWidth={2.25} />
            </div>
            <h3 className="text-xl font-bold text-foreground">{usp.loyalty_title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {usp.loyalty_desc}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-dashed border-emerald-300 bg-white/80 p-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <Stamp className="h-4 w-4" />
            {usp.stamp_card_title}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-400 bg-emerald-50 text-xs font-bold text-emerald-700"
              >
                {i + 1}
              </div>
            ))}
            <div
              className={cn(
                'flex h-10 min-w-[4.5rem] items-center justify-center rounded-full px-3 text-xs font-bold text-white',
                'bg-emerald-600',
              )}
            >
              {usp.stamp_free_label}
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{usp.stamp_note}</p>
        </div>
      </div>
    </section>
  );
}
