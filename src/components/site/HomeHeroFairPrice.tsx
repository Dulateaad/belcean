'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/contexts/dictionary-context';
import { HERO_BANNER_IMAGE } from '@/lib/hero-image';
import { ArrowRight } from 'lucide-react';

export function HomeHeroFairPrice() {
  const t = useDictionary();
  const h = t.HomePage;
  const params = useParams();
  const locale = (params.locale as string) || 'ru';

  const features = [
    { title: h.hero_feature_fast_title, desc: h.hero_feature_fast_desc },
    { title: h.hero_feature_staff_title, desc: h.hero_feature_staff_desc },
    { title: h.hero_feature_guarantee_title, desc: h.hero_feature_guarantee_desc },
    { title: h.hero_feature_price_title, desc: h.hero_feature_price_desc },
  ];

  const bullets = [h.hero_bullet_1, h.hero_bullet_2, h.hero_bullet_3];

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Image
          src={HERO_BANNER_IMAGE}
          alt={h.hero_title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1792px] px-4 pb-0 pt-28 md:px-6 md:pt-32 lg:pt-36">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
          <div>
            <h1 className="font-headline text-[2rem] font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.35rem]">
              <span className="text-primary">{h.hero_headline_accent}</span>
              <br />
              <span>{h.hero_headline_lead}</span>
            </h1>

            <p className="mt-5 inline-block rounded-full border-2 border-white/90 px-5 py-2 text-sm font-bold uppercase tracking-wide text-white sm:text-base">
              {h.hero_headline_tail}
            </p>

            <ul className="mt-8 space-y-3 text-sm text-white/90 sm:text-base">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 pb-4 lg:pb-8">
            <p className="max-w-md text-base leading-relaxed text-white/85 sm:text-lg">{h.hero_subtitle}</p>
            <Link
              href={`/${locale}#inquiry`}
              className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-center text-sm font-bold uppercase tracking-wide text-slate-950 shadow-lg transition-transform hover:scale-[1.02] hover:bg-primary/90 sm:text-base"
            >
              {h.hero_cta}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-0 border-t border-white/10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {features.map(({ title, desc }) => (
            <div
              key={title}
              className="flex gap-4 border-b border-white/10 px-0 py-6 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 lg:py-8 lg:last:border-r-0"
            >
              <span className="mt-1 h-auto w-1 shrink-0 self-stretch rounded-full bg-primary" aria-hidden />
              <div className="min-w-0">
                <p className="font-headline text-lg font-bold uppercase tracking-tight text-white">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
