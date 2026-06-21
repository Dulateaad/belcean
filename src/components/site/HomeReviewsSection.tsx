'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useDictionary } from '@/contexts/dictionary-context';
import * as constants from '@/lib/constants';
import { TELEGRAM_HREF } from '@/lib/contact-links';
import { cn } from '@/lib/utils';

const MONTHS_RU = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];
const MONTHS_UZ = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr',
];

function formatReviewDate(date: string, locale: string): string {
  if (date.includes('года') || date.includes('yil')) return date;
  const parts = date.split('.');
  if (parts.length === 2) {
    const month = parseInt(parts[0], 10);
    const year = parts[1];
    if (locale === 'uz') {
      return `1-${MONTHS_UZ[month - 1]} ${year}-yil`;
    }
    return `1 ${MONTHS_RU[month - 1]} ${year} года`;
  }
  return date;
}

function ScallopedReviewCard({
  name,
  subtitle,
  quote,
  date,
  locale,
}: {
  name: string;
  subtitle: string;
  quote: string;
  date: string;
  locale: string;
}) {
  return (
    <div className="relative h-full min-h-[300px]">
      <div
        className="absolute inset-x-0 top-0 z-10 h-3"
        style={{
          backgroundImage: 'radial-gradient(circle at 9px 0, transparent 8px, #f1f5f9 8px)',
          backgroundSize: '18px 12px',
          backgroundRepeat: 'repeat-x',
        }}
        aria-hidden
      />
      <div className="flex h-full min-h-[300px] flex-col rounded-b-2xl bg-slate-100 px-6 pb-6 pt-8">
        <p className="text-lg font-bold text-slate-900">{name}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-700">{quote}</p>
        <p className="mt-6 text-sm font-bold text-slate-900">{formatReviewDate(date, locale)}</p>
      </div>
    </div>
  );
}

export function HomeReviewsSection() {
  const t = useDictionary();
  const h = t.HomePage;
  const params = useParams();
  const locale = (params.locale as string) || 'ru';
  const testimonials = constants.getTestimonials(t);
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const plugin = React.useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));

  React.useEffect(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    api.on('select', () => setSelectedIndex(api.selectedScrollSnap()));
  }, [api]);

  if (!testimonials.length) return null;

  const navBtn =
    'static h-12 w-12 translate-y-0 rounded-xl border-0 bg-primary text-slate-950 shadow-md hover:bg-primary/90 disabled:opacity-40';

  return (
    <section id="reviews" className="relative w-full overflow-hidden bg-white py-14 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-left">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[2.5rem]">
            {h.reviews_title}
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">{h.reviews_subtitle}</p>
        </div>

        <div className="relative mt-10 md:mt-12">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            opts={{ align: 'start', loop: true }}
            className="w-full"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <CarouselPrevious className={cn(navBtn, 'shrink-0')} aria-label="Previous">
                <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
              </CarouselPrevious>

              <div className="min-w-0 flex-1">
                <CarouselContent className="-ml-3 md:-ml-4">
                  {testimonials.map((review, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-full pl-3 sm:basis-1/2 md:pl-4 lg:basis-1/3"
                    >
                      <ScallopedReviewCard
                        name={review.name}
                        subtitle={review.isBusiness ? review.role : h.reviews_client_label}
                        quote={review.quote}
                        date={review.date}
                        locale={locale}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>

              <CarouselNext className={cn(navBtn, 'shrink-0')} aria-label="Next">
                <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
              </CarouselNext>
            </div>
          </Carousel>
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-2.5 w-2.5 rounded-full transition-all',
                  selectedIndex === index ? 'bg-slate-900 scale-110' : 'bg-slate-300 hover:bg-slate-400',
                )}
                aria-label={`Отзыв ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}#inquiry`}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wide text-slate-950 transition-colors hover:bg-primary/90 sm:text-sm"
            >
              {h.reviews_order_button}
            </Link>
            <a
              href={TELEGRAM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-slate-800 sm:text-sm"
            >
              {h.reviews_leave_button}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14 h-4 w-full bg-slate-900 md:mt-16" aria-hidden />
    </section>
  );
}
