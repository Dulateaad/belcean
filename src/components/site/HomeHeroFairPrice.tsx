'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/contexts/dictionary-context';
import { HERO_BANNER_IMAGE, HERO_PROMO_VIDEO } from '@/lib/hero-image';
import { ArrowRight } from 'lucide-react';

const mediaClassName =
  'absolute inset-0 h-full w-full scale-110 object-cover object-[center_22%] brightness-105 saturate-105 blur-[3px] md:object-[62%_38%] md:brightness-110 md:blur-[4px]';

export function HomeHeroFairPrice() {
  const t = useDictionary();
  const h = t.HomePage;
  const params = useParams();
  const locale = (params.locale as string) || 'ru';
  const [videoFailed, setVideoFailed] = useState(false);

  const features = [
    { title: h.hero_feature_fast_title, desc: h.hero_feature_fast_desc },
    { title: h.hero_feature_staff_title, desc: h.hero_feature_staff_desc },
    { title: h.hero_feature_guarantee_title, desc: h.hero_feature_guarantee_desc },
    { title: h.hero_feature_price_title, desc: h.hero_feature_price_desc },
  ];

  const bullets = [h.hero_bullet_1, h.hero_bullet_2, h.hero_bullet_3];

  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-slate-950 md:min-h-[78vh] lg:min-h-[85vh]">
      <div className="absolute inset-0 min-h-full overflow-hidden">
        {!videoFailed ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_BANNER_IMAGE}
            onError={() => setVideoFailed(true)}
            className={mediaClassName}
          >
            <source src={HERO_PROMO_VIDEO} type="video/quicktime" />
            <source src={HERO_PROMO_VIDEO} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={HERO_BANNER_IMAGE}
            alt={h.hero_title}
            fill
            priority
            className={mediaClassName}
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/75 md:bg-gradient-to-r md:from-slate-950/80 md:from-0% md:via-slate-950/45 md:via-35% md:to-slate-950/5 md:to-70%" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 from-0% via-transparent via-40% to-transparent to-100% md:from-slate-950/55 md:via-35%" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-[1792px] flex-col justify-end px-4 pb-8 pt-28 md:min-h-[78vh] md:px-6 md:pb-10 md:pt-32 lg:min-h-[85vh] lg:pb-12 lg:pt-36">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
          <div>
            <h1 className="font-headline text-[2.15rem] font-black uppercase leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:text-5xl md:text-6xl lg:text-[3.35rem]">
              <span className="text-primary drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">{h.hero_headline_accent}</span>
              <br />
              <span>{h.hero_headline_lead}</span>
            </h1>

            <p className="mt-5 inline-block rounded-full border-2 border-white bg-black/30 px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white backdrop-blur-sm sm:text-base">
              {h.brand_slogan}
            </p>

            <ul className="mt-8 space-y-3.5 text-base font-semibold text-white sm:text-lg">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                  <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(45,212,191,0.8)]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 pb-4 lg:pb-8">
            <p className="max-w-md text-base font-semibold leading-relaxed text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] sm:text-lg">{h.hero_subtitle}</p>
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
                <p className="font-headline text-base font-extrabold uppercase tracking-tight text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] sm:text-lg">{title}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-white/90 sm:text-base">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
