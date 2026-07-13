'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';
import { SERVICE_CARD_IMAGES } from '@/lib/service-images';
import { ServicesCalculateCta } from '@/components/site/ServicesCalculateCta';
import { cn } from '@/lib/utils';

type ServiceMeta = {
  slug: string;
  title: string;
  card_title?: string;
  description: string;
  price_from?: number;
};

type ServiceGroupItem = {
  label: string;
  slug: string;
  imageKey?: string;
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
  const unit = h.pricing_unit;
  const groups = (h.services_groups as ServiceGroup[]) || [];
  const allServices = (t.Constants.services as ServiceMeta[]) || [];

  const formatPrice = (n: number) =>
    new Intl.NumberFormat(locale === 'uz' ? 'uz-UZ' : 'ru-RU').format(n);

  const resolveHref = (slug: string) => {
    if (slug.startsWith('#')) return `/${locale}${slug}`;
    if (PAGES_WITHOUT_ROUTE.has(slug)) return `/${locale}#inquiry`;
    return `/${locale}${slug}`;
  };

  const getMeta = (slug: string) => allServices.find((s) => s.slug === slug);

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

        <div className="mx-auto flex max-w-6xl flex-col gap-12 md:gap-14">
          {groups.map((group) => (
            <div key={group.id}>
              <div className="mb-5 flex items-center gap-3 border-b border-border/70 pb-3">
                <span className="text-2xl leading-none sm:text-3xl" aria-hidden>
                  {group.emoji}
                </span>
                <h3 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {group.title}
                </h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item) => {
                  const meta = getMeta(item.slug);
                  const imageKey = item.imageKey || item.slug;
                  const image = SERVICE_CARD_IMAGES[imageKey] || SERVICE_CARD_IMAGES[item.slug];
                  const price = meta?.price_from;
                  const href = resolveHref(item.slug);

                  return (
                    <article
                      key={`${group.id}-${item.label}`}
                      className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md"
                    >
                      {image ? (
                        <div
                          className={cn(
                            'relative w-full overflow-hidden bg-muted',
                            image.cropBottom ? 'h-44 sm:h-48' : 'h-48 sm:h-52',
                          )}
                        >
                          <Image
                            src={image.src}
                            alt={item.label}
                            fill
                            className={cn(
                              'object-cover',
                              image.cropBottom ? 'object-[center_15%] scale-110' : 'object-center',
                            )}
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            loading="lazy"
                          />
                        </div>
                      ) : null}

                      <div className="flex flex-1 flex-col p-5 text-left">
                        <h4 className="font-headline text-lg font-bold leading-snug text-foreground">
                          {item.label}
                        </h4>
                        {meta?.description ? (
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                            {meta.description}
                          </p>
                        ) : (
                          <div className="flex-1" />
                        )}
                        {price != null && price > 0 ? (
                          <p className="mt-4 text-sm font-semibold text-foreground">
                            {h.services_price_prefix} {formatPrice(price)} {unit}{' '}
                            {h.services_price_suffix}
                          </p>
                        ) : (
                          <p className="mt-4 text-sm font-semibold text-foreground">
                            {h.services_price_individual}
                          </p>
                        )}
                        <Link
                          href={href}
                          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary py-3 text-center text-sm font-bold uppercase tracking-wide text-slate-950 transition-colors hover:bg-primary/90"
                        >
                          {h.services_order_button}
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <ServicesCalculateCta />
      </div>
    </section>
  );
}
