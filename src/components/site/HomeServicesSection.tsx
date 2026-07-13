'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Home,
  Leaf,
  Sparkles,
  ThumbsUp,
} from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';
import { SERVICE_CARD_IMAGES } from '@/lib/service-images';
import { ServicesCalculateCta } from '@/components/site/ServicesCalculateCta';
import { cn } from '@/lib/utils';

type ServiceTag = {
  label: string;
  slug: string;
};

type HomeCard = {
  id: string;
  title: string;
  subtitle: string;
  imageKey: string;
  href?: string;
  expand?: boolean;
  tags?: ServiceTag[];
};

type BusinessCard = {
  id: string;
  title: string;
  subtitle: string;
  imageKey: string;
  href: string;
};

const PAGES_WITHOUT_ROUTE = new Set(['/vlazhnaya-uborka', '/pomosh-pri-pereezde']);

const TRUST_ICONS = [CheckCircle2, Leaf, Clock3, ThumbsUp];

function resolveHref(locale: string, slug: string) {
  if (slug.startsWith('#')) return `/${locale}${slug}`;
  if (PAGES_WITHOUT_ROUTE.has(slug)) return `/${locale}#inquiry`;
  return `/${locale}${slug}`;
}

function ServiceThumb({
  imageKey,
  alt,
  className,
}: {
  imageKey: string;
  alt: string;
  className?: string;
}) {
  const image = SERVICE_CARD_IMAGES[imageKey];
  if (!image) return <div className={cn('bg-muted', className)} />;

  return (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      <Image
        src={image.src}
        alt={alt}
        fill
        className={cn(
          'object-cover',
          image.cropBottom ? 'scale-110 object-[center_15%]' : 'object-center',
        )}
        sizes="120px"
        loading="lazy"
      />
    </div>
  );
}

export function HomeServicesSection() {
  const t = useDictionary();
  const h = t.HomePage;
  const params = useParams();
  const locale = (params.locale as string) || 'ru';
  const [openDryCleaning, setOpenDryCleaning] = useState(false);

  const homeCards = (h.services_home_cards as HomeCard[]) || [];
  const businessCards = (h.services_business_cards as BusinessCard[]) || [];
  const featured = h.services_business_featured as BusinessCard | undefined;
  const trustItems = (h.services_trust as string[]) || [];

  return (
    <section id="services" className="w-full bg-background py-14 md:py-24">
      <div className="container mx-auto max-w-3xl px-4 md:max-w-4xl md:px-6">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="inline-flex items-center justify-center gap-3 font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            <Sparkles className="h-8 w-8 text-primary" aria-hidden />
            {h.services_title}
          </h2>
          {h.services_audience_hint ? (
            <p className="mt-3 text-base font-semibold text-foreground/80 sm:text-lg">
              {h.services_audience_hint}
            </p>
          ) : null}
        </div>

        {/* Для дома */}
        <div className="mb-10 md:mb-12">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <Home className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold tracking-tight sm:text-2xl">
                {h.services_home_title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {h.services_home_subtitle}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {homeCards.map((card) => {
              const isExpand = Boolean(card.expand);
              const isOpen = isExpand && openDryCleaning;

              if (isExpand) {
                return (
                  <div
                    key={card.id}
                    className="overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDryCleaning((v) => !v)}
                      className="flex w-full items-center gap-3 p-3 text-left sm:gap-4 sm:p-4"
                      aria-expanded={isOpen}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-headline text-base font-bold text-foreground sm:text-lg">
                          {card.title}
                        </p>
                        {card.tags?.length ? (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {card.tags.map((tag) => (
                              <span
                                key={tag.label}
                                className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700"
                              >
                                {tag.label}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 shrink-0 text-muted-foreground transition-transform',
                          isOpen && 'rotate-180',
                        )}
                        aria-hidden
                      />
                    </button>

                    <div
                      className={cn(
                        'grid transition-[grid-template-rows] duration-200 ease-out',
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-wrap gap-2 border-t border-border/40 bg-slate-50/80 px-3 py-3 sm:px-4">
                          {card.tags?.map((tag) => (
                            <Link
                              key={`${tag.label}-${tag.slug}`}
                              href={resolveHref(locale, tag.slug)}
                              className="rounded-full border border-sky-200 bg-white px-3 py-1.5 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-50"
                            >
                              {tag.label}
                            </Link>
                          ))}
                          <Link
                            href={resolveHref(locale, '/himchistka-mebeli')}
                            className="rounded-full bg-primary px-3 py-1.5 text-sm font-bold text-slate-950 transition-colors hover:bg-primary/90"
                          >
                            {h.services_details_button}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={card.id}
                  className="flex items-center gap-3 rounded-2xl border border-border/50 bg-white p-3 shadow-sm sm:gap-4 sm:p-4"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={resolveHref(locale, card.href || card.tags?.[0]?.slug || '#inquiry')}
                      className="block"
                    >
                      <p className="font-headline text-base font-bold text-foreground sm:text-lg">
                        {card.title}
                      </p>
                    </Link>
                    {card.tags?.length ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {card.tags.map((tag) => (
                          <Link
                            key={tag.label}
                            href={resolveHref(locale, tag.slug)}
                            className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 transition-colors hover:bg-sky-100"
                          >
                            {tag.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <Link
                    href={resolveHref(locale, card.href || card.tags?.[0]?.slug || '#inquiry')}
                    aria-label={card.title}
                    className="shrink-0 self-center text-muted-foreground"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Для бизнеса */}
        <div className="mb-10 md:mb-12">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <Building2 className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold tracking-tight sm:text-2xl">
                {h.services_business_title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {h.services_business_subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {businessCards.map((card) => (
              <Link
                key={card.id}
                href={resolveHref(locale, card.href)}
                className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <ServiceThumb
                  imageKey={card.imageKey}
                  alt={card.title}
                  className="aspect-[4/3] w-full"
                />
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <p className="font-headline text-sm font-bold leading-snug text-foreground sm:text-base">
                    {card.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {card.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {featured ? (
            <Link
              href={resolveHref(locale, featured.href)}
              className="mt-3 flex items-center gap-3 rounded-2xl border border-border/50 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-4 sm:p-4"
            >
              <ServiceThumb
                imageKey={featured.imageKey}
                alt={featured.title}
                className="h-16 w-16 shrink-0 rounded-xl sm:h-20 sm:w-20"
              />
              <div className="min-w-0 flex-1">
                <p className="font-headline text-base font-bold text-foreground sm:text-lg">
                  {featured.title}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">{featured.subtitle}</p>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
            </Link>
          ) : null}
        </div>

        {trustItems.length ? (
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {trustItems.map((label, index) => {
              const Icon = TRUST_ICONS[index] ?? CheckCircle2;
              return (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </div>
                  <p className="text-xs font-semibold leading-snug text-foreground sm:text-sm">
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        ) : null}

        <ServicesCalculateCta />
      </div>
    </section>
  );
}
