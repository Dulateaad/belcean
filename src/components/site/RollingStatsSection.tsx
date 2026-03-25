"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DIGIT_H = 56;
/** Больше полных оборотов 0→9 — цифры дольше «крутятся», финал не резкий */
const CYCLES = 5;
const DURATION_MS = 3200;
const EASING = "cubic-bezier(0.15, 0.85, 0.25, 1)";
const DIGIT_STAGGER_MS = 100;

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
    <div className="relative inline-block h-14 min-w-[2.25rem] overflow-hidden md:min-w-[2.5rem]">
      <div
        className="flex flex-col motion-reduce:!transition-none"
        style={{
          transform: `translateY(${active ? -finalIndex * DIGIT_H : 0}px)`,
          transitionProperty: active ? "transform" : "none",
          transitionDuration: active ? `${DURATION_MS}ms` : "0ms",
          transitionTimingFunction: EASING,
          transitionDelay: active ? `${delayMs}ms` : "0ms",
        }}
      >
        {strip.map((d, i) => (
          <div
            key={i}
            className="flex h-14 shrink-0 items-center justify-center font-headline text-4xl font-extrabold tracking-tighter text-foreground tabular-nums md:text-5xl"
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
  const lastDigitDelay = delayBase + Math.max(0, digits.length - 1) * DIGIT_STAGGER_MS;
  const plusDelayMs = lastDigitDelay + Math.round(DURATION_MS * 0.92);

  return (
    <div className="flex flex-col items-center px-2">
      <div className="flex items-center justify-center gap-0">
        {digits.map((ch, i) => (
          <DigitRoller
            key={`${value}-${i}`}
            targetDigit={Number(ch)}
            active={active}
            delayMs={active ? delayBase + i * DIGIT_STAGGER_MS : 0}
          />
        ))}
        <span
          className={cn(
            "inline-flex h-14 min-w-[1.25rem] items-center justify-center pl-1 font-headline text-2xl font-extrabold leading-none text-red-500 md:pl-1.5 md:text-3xl",
            "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none"
          )}
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "scale(1) translateY(0)" : "scale(0.88) translateY(4px)",
            transitionDelay: active ? `${plusDelayMs}ms` : "0ms",
          }}
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
