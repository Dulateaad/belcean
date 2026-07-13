'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';
import { ServicesCalculateCta } from '@/components/site/ServicesCalculateCta';

type ServiceGroupItem = {
  label: string;
  slug: string;
};

type ServiceGroup = {
  id: string;
  emoji: string;
  title: string;
  items: ServiceGroupItem[];
};

const PAGES_WITHOUT_ROUTE = new Set(['/vlazhnaya-uborka', '/pomosh-pri-pereezde']);

export function HomeServicesSection() {
  const t = useDictionary();
  const h = t.HomePage;
  const params = useParams();
  const locale = (params.locale as string) || 'ru';
  const groups = (h.services_groups as ServiceGroup[]) || [];

  const resolveHref = (slug: string) => {
    if (slug.startsWith('#')) {
      return `/${locale}${slug}`;
    }
    if (PAGES_WITHOUT_ROUTE.has(slug)) {
      return `/${locale}#inquiry`;
    }
    return `/${locale}${slug}`;
  };

  return (
    <section id="services" className="w-full bg-background py-14 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="inline-flex items-center justify-center gap-3 font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            <Sparkles className="h-8 w-8 text-primary" aria-hidden />
            {h.services_title}
          </h2>
          {h.services_badge ? (
            <p className="mt-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              {h.services_badge}
            </p>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3 md:gap-6">
          {groups.map((group) => (
            <div key={group.id} className="min-w-0">
              <div className="mb-3 flex items-center gap-2.5 border-b border-border/70 pb-3">
                <span className="text-2xl leading-none" aria-hidden>
                  {group.emoji}
                </span>
                <h3 className="font-headline text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {group.title}
                </h3>
              </div>

              <ul className="divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60 bg-card">
                {group.items.map((item) => (
                  <li key={`${group.id}-${item.label}`}>
                    <Link
                      href={resolveHref(item.slug)}
                      className="flex min-h-[52px] items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors active:bg-muted/70 hover:bg-muted/50"
                    >
                      <span className="text-[15px] font-medium leading-snug text-foreground sm:text-base">
                        {item.label}
                      </span>
                      <ChevronRight
                        className="h-5 w-5 shrink-0 text-muted-foreground"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ServicesCalculateCta />
      </div>
    </section>
  );
}
