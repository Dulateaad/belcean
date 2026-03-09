import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  ArrowRight,
  Star
} from 'lucide-react';
import { ContactForm } from '@/components/site/ContactForm';
import * as constants from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { HeroCarousel } from '@/components/site/HeroCarousel';


export default async function Home({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getDictionary(locale);
  const mapPlaceholder = PlaceHolderImages.find(p => p.id === 'map');
  const services = constants.getServices(t);
  const testimonials = constants.getTestimonials(t);
  const clientTypes = constants.getClientTypes(t);
  const whyBeClean = constants.getWhyBeClean(t);
  const howItWorks = constants.getHowItWorks(t);
  const heroCarouselImages = [
    PlaceHolderImages.find(p => p.id === 'hero-carousel-1'),
    PlaceHolderImages.find(p => p.id === 'hero-carousel-2')
  ].filter(Boolean) as any[];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section id="hero" className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
        <HeroCarousel images={heroCarouselImages} />
        <div className="absolute inset-0 bg-cyan-950/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-primary-foreground p-4">
          <div className="w-full max-w-[1792px] mx-auto px-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-8xl/none font-headline text-white">
                  {t.HomePage.hero_title}
              </h1>
              <p className="max-w-[700px] mx-auto text-white/90 md:text-xl/relaxed mt-6">
                {t.HomePage.hero_subtitle}
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center mt-8">
                  <Button asChild size="lg">
                      <Link href="#cta">{t.Header.call_request} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
              </div>
          </div>
        </div>
      </section>

      <section id="clients" className="w-full py-16 md:py-32">
        <div className="max-w-[1792px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">{t.HomePage.clients_title}</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
                {t.HomePage.clients_subtitle}
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-2 items-start gap-8 pt-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-12 text-center">
            {clientTypes.map((client: any, index: number) => (
              <div key={index} className="flex flex-col items-center gap-4 text-center transition-transform duration-300 hover:scale-105">
                {client.imageUrl ? (
                    <Image
                      src={client.imageUrl}
                      alt={client.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 p-4 text-primary">
                      <client.icon className="h-12 w-12" />
                    </div>
                  )}
                <p className="text-lg font-semibold">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-16 md:py-32 bg-secondary text-center">
        <div className="max-w-[1792px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-12">{t.HomePage.services_title}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
            {services.map((service: any, index: number) => {
              return (
                <Card key={index} className="flex flex-col overflow-hidden bg-background border border-transparent hover:border-primary transition-colors duration-300 h-full text-center group">
                   <CardContent className="p-8 flex-grow flex flex-col items-center">
                    <div className="bg-primary/10 p-4 rounded-xl text-primary mb-6">
                       <service.icon className="w-10 h-10" />
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

      <section id="how-it-works" className="w-full py-16 md:py-32 text-center">
        <div className="max-w-[1792px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-16">{t.HomePage.how_it_works_title}</h2>
          <div className="relative mx-auto">
            <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-1 md:gap-y-16">
              {howItWorks.map((step: any, index: number) => (
                <div key={index} className="relative flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold z-10 border-8 border-background shadow-lg">
                    {index + 1}
                  </div>
                  <div className="mt-6">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground mt-2 text-lg max-w-md mx-auto">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="w-full py-16 md:py-32 bg-secondary text-center">
        <div className="max-w-[1792px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-12">{t.HomePage.why_us_title}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mx-auto">
            {whyBeClean.map((reason: any, index: number) => (
              <div key={index} className="flex flex-col items-center text-center gap-4 p-8 bg-background rounded-lg shadow-sm">
                <div className="bg-primary/10 p-4 rounded-full text-primary">
                  <reason.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-16 md:py-32 text-center overflow-x-clip">
        <div className="max-w-[1792px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-12">{t.HomePage.testimonials_title}</h2>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial: any, index: number) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2 h-full">
                    <Card className="h-full flex flex-col text-center bg-secondary">
                      <CardContent className="p-8 space-y-6 flex-grow flex flex-col justify-center items-center">
                         <div className="text-center">
                          <div className="flex items-center justify-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                            ))}
                          </div>
                          <p className="text-muted-foreground text-base max-w-[600px] mx-auto">"{testimonial.quote}"</p>
                         </div>
                        <div className="flex items-center justify-center gap-4 pt-4">
                          <Image
                            alt={testimonial.name}
                            className="rounded-full"
                            height="48"
                            src={testimonial.avatarUrl}
                            style={{
                              aspectRatio: '48/48',
                              objectFit: 'cover',
                            }}
                            width="48"
                            data-ai-hint="person"
                          />
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12" />
          </Carousel>
        </div>
      </section>

      <section id="cta" className="w-full py-16 md:py-32 lg:py-40 bg-secondary">
        <div className="max-w-[1792px] mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              {t.HomePage.cta_title}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              {t.HomePage.cta_subtitle}
            </p>
          </div>
          <div className="mx-auto w-full max-w-md">
            <ContactForm />
          </div>
        </div>
      </section>

      <section id="contacts" className="w-full py-16 md:py-32">
        <div className="max-w-[1792px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl font-headline mb-12">{t.HomePage.contacts_title}</h2>
          <div className="mx-auto grid grid-cols-1 gap-12 items-center text-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">BECLEAN SERVIS</h3>
              <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">{t.HomePage.contacts_subtitle}</p>
              <div className="space-y-3 text-lg">
                <p><strong>{t.HomePage.contacts_address}</strong> Yonariq mahallasi, Birdamlik ko&apos;chasi, 283-uy</p>
                <p><strong>{t.HomePage.contacts_phone}</strong> <a href="tel:+998773566070" className="text-primary hover:underline font-semibold">+998 77 356 60 70</a></p>
                <p><strong>{t.HomePage.contacts_email}</strong> <a href="mailto:info@beclean.pro" className="text-primary hover:underline font-semibold">info@beclean.pro</a></p>
                <p><strong>{t.HomePage.contacts_hours}</strong> 24/7</p>
              </div>
            </div>
            <div className="w-full mx-auto max-w-4xl">
              <a href="https://maps.google.com/?q=Tashkent" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Image
                  alt="Карта расположения офиса BeClean в Ташкенте"
                  className="rounded-xl object-cover w-full h-full min-h-[400px] shadow-lg"
                  height="400"
                  src={mapPlaceholder?.imageUrl || ''}
                  width="800"
                  data-ai-hint="city map"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
