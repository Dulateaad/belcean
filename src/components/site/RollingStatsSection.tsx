"use client";

import { useEffect, useRef, useState } from "react";
import { Award, SprayCan, Star, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const DIGIT_H = 56;
const CYCLES = 5;
const DURATION_MS = 3200;
const EASING = "cubic-bezier(0.15, 0.85, 0.25, 1)";
const DIGIT_STAGGER_MS = 100;

export type StatSuffix = "plus" | "none" | "star";

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
            className="flex h-14 shrink-0 items-center justify-center font-stat text-4xl font-bold tracking-tight text-foreground tabular-nums md:text-5xl md:font-extrabold"
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

function SuffixIcon({
  type,
  active,
  delayMs,
}: {
  type: "plus" | "star";
  active: boolean;
  delayMs: number;
}) {
  if (type === "plus") {
    return (
      <span
        className={cn(
          "inline-flex h-14 min-w-[1.25rem] items-center justify-center pl-1 font-stat text-2xl font-bold leading-none text-foreground md:pl-1.5 md:text-3xl md:font-extrabold",
          "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none"
        )}
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "scale(1) translateY(0)" : "scale(0.88) translateY(4px)",
          transitionDelay: active ? `${delayMs}ms` : "0ms",
        }}
        aria-hidden
      >
        +
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex h-14 min-w-[2rem] items-center justify-center pl-1 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none md:pl-1.5"
      )}
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "scale(1) translateY(0)" : "scale(0.88) translateY(4px)",
        transitionDelay: active ? `${delayMs}ms` : "0ms",
      }}
      aria-hidden
    >
      <Star className="h-9 w-9 fill-amber-400 text-amber-500 md:h-10 md:w-10" strokeWidth={1.25} />
    </span>
  );
}

function RollingRatingStat({
  value,
  label,
  labelLine2,
  active,
  delayBase,
}: {
  value: number;
  label: string;
  labelLine2?: string;
  active: boolean;
  delayBase: number;
}) {
  const intPart = Math.floor(value);
  const decPart = Math.round((value - intPart) * 10);
  const lastDelay = delayBase + DIGIT_STAGGER_MS;
  const iconDelayMs = lastDelay + Math.round(DURATION_MS * 0.92);

  return (
    <div className="flex flex-col items-center px-2">
      <div className="flex items-center justify-center gap-0">
        <DigitRoller
          targetDigit={intPart}
          active={active}
          delayMs={active ? delayBase : 0}
        />
        <span
          className="inline-flex h-14 items-center justify-center px-0.5 font-stat text-4xl font-bold text-foreground md:text-5xl md:font-extrabold"
          aria-hidden
        >
          .
        </span>
        <DigitRoller
          targetDigit={decPart}
          active={active}
          delayMs={active ? delayBase + DIGIT_STAGGER_MS : 0}
        />
        <SuffixIcon type="star" active={active} delayMs={iconDelayMs} />
      </div>
      <div className="mt-4 max-w-[14rem] text-center text-sm font-medium leading-snug text-muted-foreground md:text-base">
        <p className="text-foreground">{label}</p>
        {labelLine2 ? <p className="mt-0.5 text-muted-foreground">{labelLine2}</p> : null}
      </div>
    </div>
  );
}

function RollingStat({
  value,
  label,
  labelLine2,
  active,
  delayBase,
  suffix,
}: {
  value: number;
  label: string;
  labelLine2?: string;
  active: boolean;
  delayBase: number;
  suffix: StatSuffix;
}) {
  const digits = String(Math.max(0, Math.floor(value))).split("");
  const lastDigitDelay = delayBase + Math.max(0, digits.length - 1) * DIGIT_STAGGER_MS;
  const suffixDelayMs = lastDigitDelay + Math.round(DURATION_MS * 0.92);

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
        {suffix === "plus" && <SuffixIcon type="plus" active={active} delayMs={suffixDelayMs} />}
      </div>
      <div className="mt-4 max-w-[14rem] text-center text-sm font-medium leading-snug text-muted-foreground md:text-base">
        <p className="text-foreground">{label}</p>
        {labelLine2 ? <p className="mt-0.5 text-muted-foreground">{labelLine2}</p> : null}
      </div>
    </div>
  );
}

function RollingStatRow({
  value,
  label,
  labelLine2,
  active,
  delayBase,
  suffix,
  icon: Icon,
}: {
  value: number;
  label: string;
  labelLine2?: string;
  active: boolean;
  delayBase: number;
  suffix: StatSuffix;
  icon: LucideIcon;
}) {
  const digits = String(Math.max(0, Math.floor(value))).split("");
  const lastDigitDelay = delayBase + Math.max(0, digits.length - 1) * DIGIT_STAGGER_MS;
  const suffixDelayMs = lastDigitDelay + Math.round(DURATION_MS * 0.92);

  return (
    <div className="flex gap-4 py-6 first:pt-2 last:pb-2">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex shrink-0 items-center">
          {digits.map((ch, i) => (
            <DigitRoller
              key={`${value}-${i}`}
              targetDigit={Number(ch)}
              active={active}
              delayMs={active ? delayBase + i * DIGIT_STAGGER_MS : 0}
            />
          ))}
          {suffix === "plus" && <SuffixIcon type="plus" active={active} delayMs={suffixDelayMs} />}
        </div>
        <div className="min-w-0 text-sm leading-snug text-muted-foreground">
          <p className="font-semibold text-foreground">{label}</p>
          {labelLine2 ? <p className="mt-1">{labelLine2}</p> : null}
        </div>
      </div>
    </div>
  );
}

function RollingRatingStatRow({
  value,
  label,
  labelLine2,
  active,
  delayBase,
}: {
  value: number;
  label: string;
  labelLine2?: string;
  active: boolean;
  delayBase: number;
}) {
  const intPart = Math.floor(value);
  const decPart = Math.round((value - intPart) * 10);
  const lastDelay = delayBase + DIGIT_STAGGER_MS;
  const iconDelayMs = lastDelay + Math.round(DURATION_MS * 0.92);

  return (
    <div className="flex gap-4 py-6 first:pt-2 last:pb-2">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
        <Star className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex shrink-0 items-center">
          <DigitRoller targetDigit={intPart} active={active} delayMs={active ? delayBase : 0} />
          <span
            className="inline-flex h-14 items-center justify-center px-0.5 font-stat text-4xl font-bold text-foreground md:text-5xl md:font-extrabold"
            aria-hidden
          >
            .
          </span>
          <DigitRoller
            targetDigit={decPart}
            active={active}
            delayMs={active ? delayBase + DIGIT_STAGGER_MS : 0}
          />
          <SuffixIcon type="star" active={active} delayMs={iconDelayMs} />
        </div>
        <div className="min-w-0 text-sm leading-snug text-muted-foreground">
          <p className="font-semibold text-foreground">{label}</p>
          {labelLine2 ? <p className="mt-1">{labelLine2}</p> : null}
        </div>
      </div>
    </div>
  );
}

const ROW_ICONS = [Users, SprayCan, Award, Star] as const;

export type RollingStatItem = {
  value: number;
  label: string;
  label_line2?: string;
  delayBase: number;
  suffix: StatSuffix;
  isRating?: boolean;
};

export function RollingStatsSection({
  ariaLabel,
  items,
  variant = "grid",
  statsHeader,
  backgroundImageSrc,
}: {
  ariaLabel: string;
  items: RollingStatItem[];
  variant?: "grid" | "rows";
  statsHeader?: { badge: string; line1: string; line2Accent: string };
  backgroundImageSrc?: string;
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

  const shell = (
    <div className="mx-auto max-w-6xl rounded-2xl bg-card px-4 py-10 shadow-lg ring-1 ring-border/60 md:px-10">
      {statsHeader ? (
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
            <Star className="h-3.5 w-3.5 fill-white text-white" />
            {statsHeader.badge}
          </div>
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-foreground">{statsHeader.line1}</span>
            <br className="sm:hidden" />
            <span className="text-emerald-600"> {statsHeader.line2Accent}</span>
          </h2>
        </div>
      ) : null}

      {variant === "rows" ? (
        <div className="divide-y divide-border">
          {items.map((s, i) =>
            s.isRating && s.suffix === "star" ? (
              <RollingRatingStatRow
                key={s.label}
                value={s.value}
                label={s.label}
                labelLine2={s.label_line2}
                active={active}
                delayBase={s.delayBase}
              />
            ) : (
              <RollingStatRow
                key={s.label}
                value={s.value}
                label={s.label}
                labelLine2={s.label_line2}
                active={active}
                delayBase={s.delayBase}
                suffix={s.suffix}
                icon={ROW_ICONS[i] ?? Users}
              />
            )
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((s) =>
            s.isRating && s.suffix === "star" ? (
              <RollingRatingStat
                key={s.label}
                value={s.value}
                label={s.label}
                labelLine2={s.label_line2}
                active={active}
                delayBase={s.delayBase}
              />
            ) : (
              <RollingStat
                key={s.label}
                value={s.value}
                label={s.label}
                labelLine2={s.label_line2}
                active={active}
                delayBase={s.delayBase}
                suffix={s.suffix}
              />
            )
          )}
        </div>
      )}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel}
      className={cn(
        "w-full py-14 md:py-20",
        variant === "rows" && backgroundImageSrc ? "relative overflow-hidden" : "border-y bg-background"
      )}
    >
      {variant === "rows" && backgroundImageSrc ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageSrc})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" aria-hidden />
          <div className="relative container mx-auto px-4 md:px-6">{shell}</div>
        </>
      ) : (
        <div className="container mx-auto px-4 md:px-6">{shell}</div>
      )}
    </section>
  );
}
