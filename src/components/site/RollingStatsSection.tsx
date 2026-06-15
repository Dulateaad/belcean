"use client";

import { useEffect, useRef, useState } from "react";
import { Award, SprayCan, Star, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_DIGIT_H = 40;
const CARD_DIGIT_H = 44;
const CYCLES = 5;
const DURATION_MS = 3200;
const EASING = "cubic-bezier(0.15, 0.85, 0.25, 1)";
const DIGIT_STAGGER_MS = 100;

export type StatSuffix = "plus" | "none" | "star";

function DigitRoller({
  targetDigit,
  active,
  delayMs,
  cellHeight = DEFAULT_DIGIT_H,
  digitClassName,
}: {
  targetDigit: number;
  active: boolean;
  delayMs: number;
  cellHeight?: number;
  digitClassName?: string;
}) {
  const digitClass = cn(
    "flex shrink-0 items-center justify-center font-stat font-bold leading-none tracking-tight text-foreground",
    cellHeight >= CARD_DIGIT_H - 1
      ? "text-[1.65rem] md:text-[2rem]"
      : "text-3xl md:text-4xl",
    digitClassName,
  );

  if (!active) {
    return (
      <div
        className="relative inline-flex shrink-0 items-center justify-center tabular-nums"
        style={{
          height: cellHeight,
          minWidth: Math.max(22, cellHeight * 0.36),
        }}
        aria-hidden
      >
        <span className={digitClass} style={{ height: cellHeight }}>
          {targetDigit}
        </span>
      </div>
    );
  }

  const finalIndex = (CYCLES - 1) * 10 + targetDigit;
  const strip = Array.from({ length: CYCLES * 10 }, (_, i) => i % 10);

  return (
    <div
      className="relative inline-block shrink-0 overflow-hidden tabular-nums"
      style={{
        height: cellHeight,
        minWidth: Math.max(22, cellHeight * 0.36),
      }}
    >
      <div
        className="flex flex-col motion-reduce:!transition-none"
        style={{
          transform: `translateY(${active ? -finalIndex * cellHeight : 0}px)`,
          transitionProperty: active ? "transform" : "none",
          transitionDuration: active ? `${DURATION_MS}ms` : "0ms",
          transitionTimingFunction: EASING,
          transitionDelay: active ? `${delayMs}ms` : "0ms",
        }}
      >
        {strip.map((d, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 items-center justify-center font-stat font-bold leading-none tracking-tight text-foreground",
              cellHeight >= CARD_DIGIT_H - 1
                ? "text-[1.65rem] md:text-[2rem]"
                : "text-3xl md:text-4xl",
              digitClassName,
            )}
            style={{ height: cellHeight }}
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
  cellHeight = DEFAULT_DIGIT_H,
  staticMode = false,
}: {
  type: "plus" | "star";
  active: boolean;
  delayMs: number;
  cellHeight?: number;
  staticMode?: boolean;
}) {
  const isLarge = cellHeight >= CARD_DIGIT_H - 1;
  const visible = active || staticMode;

  if (type === "plus") {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center pl-0.5 font-stat font-bold leading-none text-foreground",
          isLarge ? "text-xl md:text-2xl" : "text-xl md:text-2xl",
          "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        )}
        style={{
          height: cellHeight,
          minWidth: isLarge ? 20 : 18,
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.88) translateY(4px)",
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
        "inline-flex shrink-0 items-center justify-center pl-0.5 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none md:pl-1",
      )}
      style={{
        height: cellHeight,
        minWidth: isLarge ? 40 : 32,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.88) translateY(4px)",
        transitionDelay: active ? `${delayMs}ms` : "0ms",
      }}
      aria-hidden
    >
      <Star
        className={cn(
          "fill-amber-400 text-amber-500",
          isLarge ? "h-6 w-6 md:h-7 md:w-7" : "h-7 w-7 md:h-8 md:w-8",
        )}
        strokeWidth={1.25}
      />
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
          className="inline-flex items-center justify-center px-0.5 font-stat text-4xl font-normal leading-none text-foreground md:text-5xl"
          style={{ height: DEFAULT_DIGIT_H }}
          aria-hidden
        >
          .
        </span>
        <DigitRoller
          targetDigit={decPart}
          active={active}
          delayMs={active ? delayBase + DIGIT_STAGGER_MS : 0}
        />
        <SuffixIcon type="star" active={active} delayMs={iconDelayMs} cellHeight={DEFAULT_DIGIT_H} staticMode={!active} />
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
        {suffix === "plus" && (
          <SuffixIcon type="plus" active={active} delayMs={suffixDelayMs} cellHeight={DEFAULT_DIGIT_H} staticMode={!active} />
        )}
      </div>
      <div className="mt-4 max-w-[14rem] text-center text-sm font-medium leading-snug text-muted-foreground md:text-base">
        <p className="text-foreground">{label}</p>
        {labelLine2 ? <p className="mt-0.5 text-muted-foreground">{labelLine2}</p> : null}
      </div>
    </div>
  );
}

function RollingStatCard({
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
  const h = CARD_DIGIT_H;

  return (
    <div className="flex flex-col items-center gap-1 px-1 text-center sm:px-2">
      <div className="flex items-center justify-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-0">
          {digits.map((ch, i) => (
            <DigitRoller
              key={`${value}-${i}`}
              targetDigit={Number(ch)}
              active={active}
              delayMs={active ? delayBase + i * DIGIT_STAGGER_MS : 0}
              cellHeight={h}
            />
          ))}
          {suffix === "plus" && (
            <SuffixIcon type="plus" active={active} delayMs={suffixDelayMs} cellHeight={h} staticMode={!active} />
          )}
        </div>
      </div>
      <div className="max-w-[9.5rem] text-[11px] leading-tight text-muted-foreground sm:max-w-[10.5rem] sm:text-xs">
        <p className="font-bold text-foreground">{label}</p>
        {labelLine2 ? <p className="mt-0.5 font-semibold">{labelLine2}</p> : null}
      </div>
    </div>
  );
}

function RollingRatingStatCard({
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
  const h = CARD_DIGIT_H;

  return (
    <div className="flex flex-col items-center gap-1 px-1 text-center sm:px-2">
      <div className="flex items-center justify-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
          <Star className="h-4 w-4" strokeWidth={2.25} />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-0">
          <DigitRoller targetDigit={intPart} active={active} delayMs={active ? delayBase : 0} cellHeight={h} />
          <span
            className="inline-flex items-center justify-center px-0.5 font-stat text-[1.65rem] font-bold leading-none text-foreground md:text-[2rem]"
            style={{ height: h }}
            aria-hidden
          >
            .
          </span>
          <DigitRoller
            targetDigit={decPart}
            active={active}
            delayMs={active ? delayBase + DIGIT_STAGGER_MS : 0}
            cellHeight={h}
          />
        </div>
      </div>
      <div className="max-w-[9.5rem] text-[11px] leading-tight text-muted-foreground sm:max-w-[10.5rem] sm:text-xs">
        <p className="font-bold text-foreground">{label}</p>
        {labelLine2 ? <p className="mt-0.5 font-semibold">{labelLine2}</p> : null}
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
    <div className="mx-auto max-w-6xl rounded-2xl bg-card px-3 py-5 shadow-lg ring-1 ring-border/60 sm:px-6 sm:py-6 md:px-8">
      {statsHeader ? (
        <div className="mb-4 text-center sm:mb-5">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:text-xs">
            <Star className="h-3 w-3 fill-white text-white" />
            {statsHeader.badge}
          </div>
          <h2 className="font-headline text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl">
            <span className="text-foreground">{statsHeader.line1}</span>
            <br className="sm:hidden" />
            <span className="text-emerald-600"> {statsHeader.line2Accent}</span>
          </h2>
        </div>
      ) : null}

      {variant === "rows" ? (
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-4 sm:gap-x-3 sm:gap-y-5">
          {items.map((s, i) =>
            s.isRating && s.suffix === "star" ? (
              <RollingRatingStatCard
                key={s.label}
                value={s.value}
                label={s.label}
                labelLine2={s.label_line2}
                active={active}
                delayBase={s.delayBase}
              />
            ) : (
              <RollingStatCard
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
        "w-full py-8 md:py-12",
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
