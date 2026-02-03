'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

export function HeroCarousel({ images }: { images: any[] }) {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
    );

  return (
    <Carousel
      className="absolute inset-0 w-full h-full"
      opts={{ loop: true }}
      plugins={[plugin.current]}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              alt={image.description}
              className="object-cover"
              src={image.imageUrl}
              fill
              priority={index === 0}
              data-ai-hint={image.imageHint}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
