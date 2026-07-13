'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { LottieRefCurrentProps } from 'lottie-react';
import { useDictionary } from '@/contexts/dictionary-context';
import { Gift, Percent, Stamp } from 'lucide-react';
import { cn } from '@/lib/utils';
import confirmationAnimation from '@/assets/animations/confirmation.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const STAMP_COUNT = 6;
const STAMP_STAGGER_MS = 450;

function LoyaltyStamp({
  index,
  active,
  reducedMotion,
}: {
  index: number;
  active: boolean;
  reducedMotion: boolean;
}) {
  const [stamped, setStamped] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setStamped(true);
      return;
    }
    const timer = window.setTimeout(
      () => setStamped(true),
      index * STAMP_STAGGER_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, index, reducedMotion]);

  useEffect(() => {
    if (stamped) lottieRef.current?.setSpeed(2.75);
  }, [stamped]);

  return (
    <div
      className={cn(
        'relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-500 motion-reduce:transition-none sm:h-16 sm:w-16',
        stamped
          ? 'scale-100 border-emerald-500 bg-emerald-50 opacity-100 shadow-md'
          : 'scale-90 border-dashed border-emerald-400 bg-white opacity-80',
        active && !stamped && !reducedMotion && 'animate-pulse',
      )}
      style={
        active && !reducedMotion
          ? { transitionDelay: `${index * 80}ms` }
          : undefined
      }
    >
      {stamped ? (
        <Lottie
          lottieRef={lottieRef}
          animationData={confirmationAnimation}
          loop={false}
          className="h-11 w-11 sm:h-12 sm:w-12"
        />
      ) : (
        <span className="text-sm font-bold text-emerald-600 sm:text-base">{index + 1}</span>
      )}
    </div>
  );
}

export function HomeUspSection() {
  const h = useDictionary().HomePage;
  const usp = h.usp;
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [stampsComplete, setStampsComplete] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setStampsComplete(true);
      return;
    }
    const timer = window.setTimeout(
      () => setStampsComplete(true),
      (STAMP_COUNT - 1) * STAMP_STAGGER_MS + 700,
    );
    return () => window.clearTimeout(timer);
  }, [inView, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="offers"
      className="w-full scroll-mt-20 bg-gradient-to-b from-emerald-50/80 to-background py-14 md:py-20"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={cn(
            'mx-auto max-w-4xl text-center transition-all duration-700 motion-reduce:transition-none',
            inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            {usp.badge}
          </p>
          <h2 className="mt-2 font-headline text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {usp.title}
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">{usp.subtitle}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          <div
            className={cn(
              'rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm transition-all duration-500 motion-reduce:transition-none',
              'hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md motion-reduce:hover:translate-y-0',
              inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
            style={{ transitionDelay: inView ? '120ms' : '0ms' }}
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Percent className="h-5 w-5" strokeWidth={2.25} />
            </div>
            <h3 className="text-xl font-bold text-foreground">{usp.first_discount_title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {usp.first_discount_desc}
            </p>
          </div>
          <div
            className={cn(
              'rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm transition-all duration-500 motion-reduce:transition-none',
              'hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md motion-reduce:hover:translate-y-0',
              inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
            style={{ transitionDelay: inView ? '220ms' : '0ms' }}
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Gift className="h-5 w-5" strokeWidth={2.25} />
            </div>
            <h3 className="text-xl font-bold text-foreground">{usp.loyalty_title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {usp.loyalty_desc}
            </p>
          </div>
        </div>

        <div
          className={cn(
            'mx-auto mt-10 max-w-xl transition-all duration-700 motion-reduce:transition-none',
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
          )}
          style={{ transitionDelay: inView ? '320ms' : '0ms' }}
        >
          <div
            className={cn(
              'flex flex-col justify-center rounded-2xl border-2 border-emerald-400 bg-white p-8 text-center shadow-lg sm:p-10',
              'hover:border-emerald-500 hover:shadow-xl motion-reduce:hover:shadow-lg',
              inView ? 'scale-100' : 'scale-[0.98]',
            )}
            aria-label={usp.stamp_card_aria}
          >
            <div className="mb-6 inline-flex items-center justify-center gap-2 text-base font-bold text-emerald-700 sm:text-lg">
              <Stamp className="h-5 w-5" />
              {usp.stamp_card_title}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {Array.from({ length: STAMP_COUNT }).map((_, i) => (
                <LoyaltyStamp
                  key={i}
                  index={i}
                  active={inView}
                  reducedMotion={reducedMotion}
                />
              ))}
              <div
                className={cn(
                  'flex h-14 min-w-[5rem] items-center justify-center gap-1.5 rounded-full px-4 text-sm font-bold text-white transition-all duration-500 motion-reduce:transition-none sm:h-16 sm:min-w-[5.5rem] sm:text-base',
                  'bg-emerald-600',
                  stampsComplete
                    ? 'scale-105 shadow-lg ring-4 ring-emerald-300/60 motion-reduce:scale-100 motion-reduce:ring-0'
                    : 'scale-100 opacity-90',
                )}
              >
                <Gift className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
                {usp.stamp_free_label}
              </div>
            </div>
            <p
              className={cn(
                'mt-6 text-base leading-relaxed text-slate-700 transition-opacity duration-700 motion-reduce:transition-none sm:text-lg',
                inView ? 'opacity-100' : 'opacity-0',
              )}
              style={{ transitionDelay: inView ? '520ms' : '0ms' }}
            >
              {usp.stamp_note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
