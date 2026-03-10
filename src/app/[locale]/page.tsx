
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  ArrowRight,
  Sparkles,
  ClipboardList,
  ShieldCheck,
  CheckCircle2,
  Camera,
  MessageSquare,
  Calculator,
  Quote,
  Star
} from 'lucide-react';
import { ContactForm } from '@/components/site/ContactForm';
import * as constants from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { HeroCarousel } from '@/components/site/HeroCarousel';
import { AutoCarousel } from '@/components/site/AutoCarousel';
import { cn } from '@/lib/utils';

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const mapPlaceholder = PlaceHolderImages.find(p => p.id === 'map');
  const services = constants.getServices(t);
  const clientTypes = constants.getClientTypes(t);
  const whyBeClean = constants.getWhyBeClean(t);
  const howItWorks = constants.getHowItWorks(t);
  const beforeAfterImages = constants.getBeforeAfterImages();
  const testimonials = constants.getTestimonials(t);

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
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-8xl/none font-headline text-white animate-fade-in text-center">
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
                    <Link href="#cta">{t.Header.call_request} <ArrowRight className="ml-2 h-5 w-5" /></Link>
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

      <section id="services" className="w-full py-16 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline inline-flex items-center gap-3 relative after:content-[''] after:absolute after:-bottom-4 after:left-1/4 after:right-1/4 after:h-1 after:bg-primary after:rounded-full">
              <Sparkles className="w-8 h-8 text-primary" /> {t.HomePage.services_title}
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {services.map((service: any, index: number) => {
              return (
                <Card key={index} className="flex flex-col overflow-hidden bg-background border border-transparent hover:border-primary transition-colors duration-300 h-full group">
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

      <section id="how-it-works" className="w-full py-16 md:py-32">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline inline-flex items-center gap-3 relative after:content-[''] after:absolute after:-bottom-4 after:left-1/4 after:right-1/4 after:h-1 after:bg-primary after:rounded-full">
              <ClipboardList className="w-8 h-8 text-primary" /> {t.HomePage.how_it_works_title}
            </h2>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 w-full">
              {howItWorks.map((step: any, index: number) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-6 shadow-md">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="w-full py-16 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline inline-flex items-center gap-3 relative after:content-[''] after:absolute after:-bottom-4 after:left-1/4 after:right-1/4 after:h-1 after:bg-primary after:rounded-full">
              <ShieldCheck className="w-8 h-8 text-primary" /> {t.HomePage.why_us_title}
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {whyBeClean.map((reason: any, index: number) => (
              <div key={index} className="flex flex-col items-center text-center gap-4 p-8 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 p-4 rounded-full text-primary">
                  <reason.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold">{reason.title}</h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="w-full py-16 md:py-32 text-center overflow-x-clip">
        <div className="max-w-[1792px] mx-auto px-4 md:px-6">
          <h2 className="text-lg font-bold tracking-tighter sm:text-xl font-headline mb-12 flex items-center justify-center gap-3">
            <Camera className="w-8 h-8 text-primary" /> {t.HomePage.gallery_title}
          </h2>
          <AutoCarousel className="w-full mx-auto">
            <CarouselContent>
              {beforeAfterImages.map((imageUrl: string, index: number) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2 h-full">
                    <Card className="h-full overflow-hidden">
                       <Image
                          src={imageUrl}
                          alt={`Work result ${index + 1}`}
                          width={600}
                          height={400}
                          className="w-full aspect-video object-cover"
                       />
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

      <section id="testimonials" className="w-full py-16 md:py-32 bg-secondary text-center overflow-x-clip">
        <div className="max-w-[1792px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-12 flex items-center justify-center gap-3">
            <MessageSquare className="w-8 h-8 text-primary" /> {t.HomePage.testimonials_title}
          </h2>
          <AutoCarousel className="w-full mx-auto" delay={6000}>
            <CarouselContent>
              {testimonials.map((item: any, index: number) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2 h-full">
                    <Card className="h-full overflow-hidden flex flex-col bg-background text-left border-none shadow-md">
                       <CardHeader className="flex flex-row items-center gap-4 p-6 pb-2">
                          <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                            <AvatarImage src={item.avatar} alt={item.name} />
                            <AvatarFallback>{item.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-base leading-none mb-1">{item.name}</p>
                                <span className="text-[10px] text-muted-foreground font-semibold bg-secondary px-2 py-0.5 rounded-full">{item.date}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{item.role}</p>
                          </div>
                       </CardHeader>
                       <CardContent className="p-6 pt-2 flex-grow">
                          <div className="flex gap-0.5 mb-3 text-yellow-400">
                             {[...Array(5)].map((_, i) => (
                               <Star key={i} className={cn("w-4 h-4 fill-current", i >= (item.stars || 5) && "text-muted")} />
                             ))}
                          </div>
                          <Quote className="w-6 h-6 text-primary/20 mb-3" />
                          <p className="text-muted-foreground italic text-sm leading-relaxed">
                            "{item.quote}"
                          </p>
                       </CardContent>
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

      <section id="contacts" className="w-full py-16 md:py-32">
        <div className="max-w-[1792px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl font-headline mb-12">{t.HomePage.contacts_title}</h2>
          <div className="mx-auto grid grid-cols-1 gap-12 items-center text-center">
            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-bold">BECLEAN SERVIS</h3>
              <p className="text-muted-foreground text-lg max-w-[600px] mx-auto text-center">{t.HomePage.contacts_subtitle}</p>
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
