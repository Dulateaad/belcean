'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';
import { HOMEPAGE_SERVICE_SLUGS, SERVICE_CARD_IMAGES } from '@/lib/service-images';
import { ServicesCalculateCta } from '@/components/site/ServicesCalculateCta';
import { cn } from '@/lib/utils';

type ServiceItem = {
  slug: string;
  title: string;
  card_title?: string;
  description: string;
  price_from?: number;
};

export function HomeServicesSection() {
  const t = useDictionary();
  const h = t.HomePage;
  const params = useParams();
  const locale = (params.locale as string) || 'ru';
  const unit = h.pricing_unit;

  const allServices = t.Constants.services as ServiceItem[];
  const services = HOMEPAGE_SERVICE_SLUGS.map((slug) => allServices.find((s) => s.slug === slug)).filter(
    Boolean,
  ) as ServiceItem[];

  const formatPrice = (n: number) =>
    new Intl.NumberFormat(locale === 'uz' ? 'uz-UZ' : 'ru-RU').format(n);

  return (
    <section id="services" className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="inline-flex items-center justify-center gap-3 font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            <Sparkles className="h-8 w-8 text-primary" aria-hidden />
            {h.services_title}
          </h2>
          {h.services_badge ? (
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              <span className="h-2 w-2 rounded-sm bg-primary" aria-hidden />
              {h.services_badge}
            </p>
          ) : null}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const image = SERVICE_CARD_IMAGES[service.slug];
            const title = service.card_title || service.title;
            const hasPage = !['/vlazhnaya-uborka', '/pomosh-pri-pereezde'].includes(service.slug);
            const href = hasPage ? `/${locale}${service.slug}` : `/${locale}#inquiry`;
            const price = service.price_from;

            return (
              <article
                key={service.slug}
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
                      alt={title}
                      fill
                      className={cn(
                        'object-cover',
                        image.cropBottom ? 'object-[center_15%] scale-110' : 'object-center',
                      )}
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      loading="lazy"
                    />
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col p-5 text-left">
                  <h3 className="font-headline text-lg font-bold leading-snug text-foreground">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                    {service.description}
                  </p>
                  {price != null && price > 0 ? (
                    <p className="mt-4 text-sm font-semibold text-foreground">
                      {h.services_price_prefix} {formatPrice(price)} {unit} {h.services_price_suffix}
                    </p>
                  ) : (
                    <p className="mt-4 text-sm font-semibold text-foreground">{h.services_price_individual}</p>
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

        <ServicesCalculateCta />
      </div>
    </section>
  );
}
