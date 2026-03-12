
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Camera,
  Calculator,
  Handshake
} from 'lucide-react';
import { ContactForm } from '@/components/site/ContactForm';
import * as constants from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { HeroCarousel } from '@/components/site/HeroCarousel';
import { AutoCarousel } from '@/components/site/AutoCarousel';

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getDictionary(locale);
  const services = constants.getServices(t);
  const clientTypes = constants.getClientTypes(t);
  const beforeAfterImages = constants.getBeforeAfterImages();

  const heroCarouselImages = [
    PlaceHolderImages.find(p => p.id === 'hero-carousel-1'),
    PlaceHolderImages.find(p => p.id === 'hero-carousel-2')
  ].filter(Boolean) as any[];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section id="hero" className="relative w-full h-auto min-h-[80vh] overflow-hidden flex flex-col">
        <div className="absolute inset-0 w-full h-full z-0">
            <HeroCarousel images={heroCarouselImages} />
            <div className="absolute inset-0 bg-cyan-950/60" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center text-primary-foreground p-4 pt-20 md:pt-32 pb-12">
          <div className="w-full max-w-[1792px] mx-auto px-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-8xl/none font-headline text-white text-center">
                  {t.HomePage.hero_title}
              </h1>
              <p className="max-w-[700px] mx-auto text-white/90 md:text-xl/relaxed mt-6 text-center">
                {t.HomePage.hero_subtitle}
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="px-8 py-6 text-lg font-bold shadow-lg hover:shadow-primary/20 animate-pulse-glow w-full sm:w-auto">
                    <Link href={`/${locale}/calculator`}>
                        <Calculator className="mr-2 h-5 w-5" /> {t.HomePage.calculate_button}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg font-bold bg-white/10 text-white border-white/20 hover:bg-white/20 w-full sm:w-auto backdrop-blur-sm">
                    <Link href={`/${locale}#cta`}>{t.ContactForm.submit_button} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
              </div>
          </div>
        </div>
      </section>

      <section id="clients" className="w-full py-16 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline flex items-center justify-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-primary" /> {t.HomePage.clients_title}
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
              {t.HomePage.clients_subtitle}
            </p>
          </div>
          <div className="mx-auto grid grid-cols-2 items-start gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-12 text-center">
            {clientTypes.map((client: any, index: number) => (
              <div key={index} className="flex flex-col items-center gap-4 text-center transition-transform duration-300 hover:scale-105">
                <div className="relative h-24 w-24 rounded-2xl bg-white shadow-sm overflow-hidden p-2">
                    <Image
                      src={client.imageUrl}
                      alt={client.name}
                      fill
                      className="object-contain p-2"
                    />
                </div>
                <p className="text-lg font-semibold">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-16 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline inline-flex items-center gap-3 relative after:content-[''] after:absolute after:-bottom-4 after:left-1/4 after:right-1/4 after:h-1 after:bg-primary after:rounded-full">
              <Sparkles className="w-8 h-8 text-primary" /> {t.HomePage.services_title}
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {services.map((service: any, index: number) => {
              const ServiceIcon = service.icon;
              return (
                <Card key={index} className="flex flex-col overflow-hidden bg-background border border-transparent hover:border-primary transition-colors duration-300 h-full group">
                   <CardContent className="p-8 flex-grow flex flex-col items-center">
                    <div className="bg-primary/10 p-4 rounded-xl text-primary mb-6">
                       <ServiceIcon className="w-10 h-10" />
                    </div>
                    <CardTitle className="text-xl mt-4">{service.title}</CardTitle>
                    <p className="text-muted-foreground mt-2 mb-4 flex-grow">{service.description}</p>
                     <Button asChild variant="link" className="p-0 h-auto font-semibold mt-auto opacity-70 group-hover:opacity-100 transition-opacity">
                      <Link href={`/${locale}${service.slug}`}>Подробнее <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="partners" className="w-full py-16 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
           <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-12 flex items-center justify-center gap-3">
              <Handshake className="w-8 h-8 text-primary" /> {t.HomePage.partners_title}
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex flex-col items-center gap-2">
                    <div className="relative h-20 w-48">
                        <Image 
                            src="https://technomarket.kg/images/feature_variant/11/Karcher-Logo.png" 
                            alt="Karcher" 
                            fill
                            className="object-contain grayscale hover:grayscale-0 transition-all"
                        />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground">Karcher</span>
                </div>
            </div>
        </div>
      </section>

      <section id="gallery" className="w-full py-16 md:py-32 text-center overflow-x-clip bg-secondary">
        <div className="max-w-[1792px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-12 flex items-center justify-center gap-3">
            <Camera className="w-8 h-8 text-primary" /> {t.HomePage.gallery_title}
          </h2>
          <AutoCarousel className="w-full mx-auto">
            <CarouselContent>
              {beforeAfterImages.map((imageUrl: string, index: number) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2 h-full">
                    <Card className="h-full overflow-hidden bg-white/50 backdrop-blur-sm">
                       <div className="relative aspect-video w-full">
                        <Image
                            src={imageUrl}
                            alt={`Work result ${index + 1}`}
                            fill
                            className="object-contain p-2"
                        />
                       </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12" />
          </AutoCarousel>
        </div>
      </section>

      <section id="cta" className="w-full py-16 md:py-32 lg:py-40 bg-background">
        <div className="max-w-[1792px] mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              {t.HomePage.cta_title}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed text-center">
              {t.HomePage.cta_subtitle}
            </p>
          </div>
          <div className="mx-auto w-full max-w-md">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
