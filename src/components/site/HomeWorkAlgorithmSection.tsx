'use client';

import Image from 'next/image';
import { ClipboardList, Headphones, Sparkles, Wallet } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';
import { WORK_ALGORITHM_IMAGE } from '@/lib/service-images';

const STEP_ICONS = [Headphones, ClipboardList, Sparkles, Wallet];

export function HomeWorkAlgorithmSection() {
  const t = useDictionary();
  const w = t.HomePage.work_algorithm;
  const steps = (w.steps ?? []) as { title: string; description: string }[];

  return (
    <section id="work-algorithm" className="w-full bg-gradient-to-br from-emerald-50 via-emerald-50/90 to-primary/10 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-slate-950">
              {w.badge}
            </div>
            <div>
              <h2 className="font-headline text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
                {w.title}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{w.lead}</p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-emerald-200/80">
              <Image
                src={WORK_ALGORITHM_IMAGE}
                alt={w.image_alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{w.subtitle}</p>
            <h3 className="mt-2 font-headline text-2xl font-bold text-foreground sm:text-3xl">{w.steps_title}</h3>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {steps.map((step, index) => {
                const Icon = STEP_ICONS[index] ?? Sparkles;
                return (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-emerald-800 ring-4 ring-primary/15">
                      <Icon className="h-7 w-7" strokeWidth={2} />
                    </div>
                    <h4 className="font-headline text-lg font-bold text-foreground">{step.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
