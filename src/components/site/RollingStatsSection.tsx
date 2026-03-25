"use client";

import { useEffect, useRef, useState } from "react";

const DIGIT_H = 56;
const CYCLES = 3;

function DigitRoller({
  targetDigit,
  active,
  delayMs,
}: {
  targetDigit: number;
  active: boolean;
  delayMs: number;
}) {
  const finalIndex = (CYCLES - 1) * 10 + targetDigit;
  const strip = Array.from({ length: CYCLES * 10 }, (_, i) => i % 10);

  return (
    <div className="relative inline-block h-14 min-w-[2.25rem] overflow-hidden align-bottom md:min-w-[2.5rem]">
      <div
        className="flex flex-col transition-transform duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{
          transform: `translateY(${active ? -finalIndex * DIGIT_H : 0}px)`,
          transitionDelay: `${delayMs}ms`,
        }}
      >
        {strip.map((d, i) => (
          <div
            key={i}
            className="flex h-14 shrink-0 items-center justify-center text-4xl font-bold tracking-tight text-foreground tabular-nums md:text-5xl font-headline"
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

function RollingStat({
  value,
  label,
  active,
  delayBase,
}: {
  value: number;
  label: string;
  active: boolean;
  delayBase: number;
}) {
  const digits = String(Math.max(0, Math.floor(value))).split("");

  return (
    <div className="flex flex-col items-center px-2">
      <div className="flex items-end justify-center">
        {digits.map((ch, i) => (
          <DigitRoller
            key={`${value}-${i}`}
            targetDigit={Number(ch)}
            active={active}
            delayMs={active ? delayBase + i * 75 : 0}
          />
        ))}
        <span
          className="mb-2 ml-0.5 select-none text-lg font-bold leading-none text-red-500 md:text-xl"
          aria-hidden
        >
          +
        </span>
      </div>
      <p className="mt-4 max-w-[14rem] text-center text-sm font-medium leading-snug text-muted-foreground md:text-base">
        {label}
      </p>
    </div>
  );
}

export type RollingStatItem = {
  value: number;
  label: string;
  delayBase: number;
};

export function RollingStatsSection({
  ariaLabel,
  items,
}: {
  ariaLabel: string;
  items: RollingStatItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setActive(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel}
      className="w-full border-y bg-background py-14 md:py-20"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-5xl rounded-2xl bg-card px-4 py-10 shadow-sm ring-1 ring-border md:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-6">
            {items.map((s) => (
              <RollingStat
                key={s.label}
                value={s.value}
                label={s.label}
                active={active}
                delayBase={s.delayBase}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
