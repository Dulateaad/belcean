'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';
import { ServicesCalculateCta } from '@/components/site/ServicesCalculateCta';
import { cn } from '@/lib/utils';

type ServiceMeta = {
  slug: string;
  description: string;
  price_from?: number;
};

type ServiceGroupItem = {
  label: string;
  slug: string;
  expand?: boolean;
};

type ServiceGroup = {
  id: string;
  emoji: string;
  title: string;
  items: ServiceGroupItem[];
};

const PAGES_WITHOUT_ROUTE = new Set(['/vlazhnaya-uborka', '/pomosh-pri-pereezde']);

function ServiceList({
  group,
  locale,
  allServices,
  openKey,
  setOpenKey,
  detailsLabel,
  orderLabel,
  pricePrefix,
  priceSuffix,
  priceIndividual,
  unit,
  formatPrice,
}: {
  group: ServiceGroup;
  locale: string;
  allServices: ServiceMeta[];
  openKey: string | null;
  setOpenKey: (key: string | null) => void;
  detailsLabel: string;
  orderLabel: string;
  pricePrefix: string;
  priceSuffix: string;
  priceIndividual: string;
  unit: string;
  formatPrice: (n: number) => string;
}) {
  const resolveHref = (slug: string) => {
    if (slug.startsWith('#')) return `/${locale}${slug}`;
    if (PAGES_WITHOUT_ROUTE.has(slug)) return `/${locale}#inquiry`;
    return `/${locale}${slug}`;
  };

  return (
    <div className="min-w-0 flex-1">
      <div className="mb-3 flex items-center gap-2.5 border-b border-border/70 pb-3">
        <span className="text-2xl leading-none" aria-hidden>
          {group.emoji}
        </span>
        <h3 className="font-headline text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {group.title}
        </h3>
      </div>

      <ul className="overflow-hidden rounded-xl border border-border/60 bg-card">
        {group.items.map((item, index) => {
          const itemKey = `${group.id}-${item.label}`;
          const meta = allServices.find((s) => s.slug === item.slug);
          const href = resolveHref(item.slug);
          const isOpen = openKey === itemKey;
          const isLast = index === group.items.length - 1;

          if (item.expand) {
            return (
              <li key={itemKey} className={cn(!isLast && 'border-b border-border/60')}>
                <button
                  type="button"
                  onClick={() => setOpenKey(isOpen ? null : itemKey)}
                  className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/50 active:bg-muted/70"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium leading-snug text-foreground sm:text-base">
                    {item.label}
                  </span>
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
                    <div className="space-y-3 bg-muted/30 px-4 pb-4 pt-1">
                      {meta?.description ? (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {meta.description}
                        </p>
                      ) : null}
                      {meta?.price_from != null && meta.price_from > 0 ? (
                        <p className="text-sm font-semibold text-foreground">
                          {pricePrefix} {formatPrice(meta.price_from)} {unit} {priceSuffix}
                        </p>
                      ) : (
                        <p className="text-sm font-semibold text-foreground">{priceIndividual}</p>
                      )}
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Link
                          href={href}
                          className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                        >
                          {detailsLabel}
                        </Link>
                        <Link
                          href={`/${locale}#inquiry`}
                          className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-slate-950 transition-colors hover:bg-primary/90"
                        >
                          {orderLabel}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          }

          return (
            <li key={itemKey} className={cn(!isLast && 'border-b border-border/60')}>
              <Link
                href={href}
                className="flex min-h-[52px] items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/50 active:bg-muted/70"
              >
                <span className="text-[15px] font-medium leading-snug text-foreground sm:text-base">
                  {item.label}
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function HomeServicesSection() {
  const t = useDictionary();
  const h = t.HomePage;
  const params = useParams();
  const locale = (params.locale as string) || 'ru';
  const groups = (h.services_groups as ServiceGroup[]) || [];
  const allServices = (t.Constants.services as ServiceMeta[]) || [];
  const [openKey, setOpenKey] = useState<string | null>(null);

  const mainGroups = groups.filter((g) => g.id === 'home' || g.id === 'business');
  const extraGroup = groups.find((g) => g.id === 'extra');

  const formatPrice = (n: number) =>
    new Intl.NumberFormat(locale === 'uz' ? 'uz-UZ' : 'ru-RU').format(n);

  const listProps = {
    locale,
    allServices,
    openKey,
    setOpenKey,
    detailsLabel: h.services_details_button || 'Подробнее',
    orderLabel: h.services_order_button,
    pricePrefix: h.services_price_prefix,
    priceSuffix: h.services_price_suffix,
    priceIndividual: h.services_price_individual,
    unit: h.pricing_unit,
    formatPrice,
  };

  return (
    <section id="services" className="w-full bg-background py-14 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
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
          {h.services_badge ? (
            <p className="mt-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              {h.services_badge}
            </p>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
          {mainGroups.map((group) => (
            <ServiceList key={group.id} group={group} {...listProps} />
          ))}
        </div>

        {extraGroup ? (
          <div className="mx-auto mt-8 max-w-5xl md:mt-10">
            <ServiceList group={extraGroup} {...listProps} />
          </div>
        ) : null}

        <ServicesCalculateCta />
      </div>
    </section>
  );
}
