'use client';

import * as React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
  date: string;
}

interface ReviewsCarouselProps {
  testimonials: TestimonialItem[];
  clientLabel: string;
  className?: string;
}

export function ReviewsCarousel({ testimonials, clientLabel, className }: ReviewsCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }));

  React.useEffect(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    api.on('select', () => setSelectedIndex(api.selectedScrollSnap()));
  }, [api]);

  if (!testimonials.length) return null;

  return (
    <div className={cn('relative w-full', className)}>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ align: 'center', loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((review, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="px-2">
                <Card className="overflow-hidden border-2 border-muted/50 bg-card shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                      {/* Avatar + Name (left) */}
                      <div className="flex flex-col items-center md:items-start shrink-0">
                        <div className="relative h-20 w-20 rounded-full overflow-hidden bg-muted ring-2 ring-primary/20">
                          <Image
                            key={review.avatarUrl}
                            src={review.avatarUrl}
                            alt={review.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <p className="font-semibold text-lg mt-3">{review.name}</p>
                        <p className="text-sm text-muted-foreground">{clientLabel}</p>
                      </div>

                      {/* Quote (center) */}
                      <blockquote className="flex-1 text-base md:text-lg text-muted-foreground italic text-center md:text-left">
                        &ldquo;{review.quote}&rdquo;
                      </blockquote>

                      {/* Date (right) */}
                      <p className="text-sm text-muted-foreground shrink-0">
                        {review.date}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-2 md:-left-12 h-10 w-10 rounded-full border-2 border-muted bg-background hover:bg-muted/50" />
        <CarouselNext className="-right-2 md:-right-12 h-10 w-10 rounded-full border-2 border-muted bg-background hover:bg-muted/50" />
      </Carousel>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              'h-2.5 w-2.5 rounded-full transition-all duration-300',
              selectedIndex === index
                ? 'bg-primary scale-125'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            )}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
