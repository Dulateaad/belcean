import Image from 'next/image';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
  Building2,
  CheckCircle,
  HardHat,
  HeartPulse,
  ShoppingBag,
  Users,
  Star,
  BookCheck,
  UserCheck,
  Camera,
  ArrowRight,
} from 'lucide-react';
import { ContactForm } from '@/components/site/ContactForm';
import { services, testimonials, clientTypes, whyBeClean, howItWorks } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export default function Home() {
  const mapPlaceholder = PlaceHolderImages.find(p => p.id === 'map');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section id="hero" className="w-full py-20 md:py-32 bg-secondary/70">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-6 lg:col-span-3">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none font-headline">
                Профессиональный клининг для бизнеса в Ташкенте
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Офисы, БЦ, клиники. Договор. Контроль качества.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/calculator">Рассчитать стоимость <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/quiz">Подобрать услугу</Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-2 flex items-center justify-center">
              <Card className="w-full max-w-md shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-center text-2xl">Заказать уборку</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="clients" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Для кого мы работаем</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Мы предоставляем качественные клининговые услуги для различных типов коммерческих объектов.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-start justify-center gap-8 py-12">
            {clientTypes.map((client, index) => (
              <div key={index} className="flex flex-col items-center gap-4 text-center">
                <div className="bg-primary/10 rounded-full p-5 text-primary">
                  <client.icon className="w-10 h-10" />
                </div>
                <p className="text-xl font-semibold">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-12 md:py-24 bg-secondary/70">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl font-headline mb-12">Наши услуги</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              return (
                <Card key={index} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                   <CardContent className="p-6 flex-grow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-lg text-primary">
                         <service.icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                     <Button asChild variant="link" className="p-0 h-auto font-semibold">
                      <Link href={service.slug}>Подробнее <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl font-headline mb-16">Как мы работаем</h2>
          <div className="relative">
             <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
             
            <div className="grid gap-y-16">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative">
                   <div className="md:hidden relative">
                      <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 z-0"></div>
                      <div className="flex items-start gap-6 relative z-10">
                         <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold border-4 border-background shadow-lg">
                             {index + 1}
                         </div>
                         <div className="pt-1">
                             <h3 className="text-2xl font-bold">{step.title}</h3>
                             <p className="text-muted-foreground mt-1 text-lg">{step.description}</p>
                         </div>
                      </div>
                   </div>

                   <div className="hidden md:grid md:grid-cols-2 md:gap-x-32 lg:gap-x-64 xl:gap-x-96 items-center">
                        {index % 2 === 0 ? (
                       <>
                           <div className="text-right">
                               <h3 className="text-2xl font-bold">{step.title}</h3>
                               <p className="text-muted-foreground mt-2 text-lg">{step.description}</p>
                           </div>
                           <div></div>
                       </>
                       ) : (
                       <>
                           <div></div>
                           <div>
                               <h3 className="text-2xl font-bold">{step.title}</h3>
                               <p className="text-muted-foreground mt-2 text-lg">{step.description}</p>
                           </div>
                       </>
                       )}
                   </div>
                   <div className="absolute w-full h-full -top-3 md:top-0 flex justify-center items-center pointer-events-none">
                      <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground hidden md:flex items-center justify-center text-3xl font-bold z-10 border-8 border-background shadow-md">
                       {index + 1}
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="w-full py-12 md:py-24 bg-secondary/70">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl font-headline mb-12">Почему BeClean</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyBeClean.map((reason, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-4 p-6 bg-background rounded-lg shadow-sm">
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

      <section id="testimonials" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl font-headline mb-12">Отзывы наших клиентов</h2>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2 h-full">
                    <Card className="h-full flex flex-col">
                      <CardContent className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                         <div>
                          <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-muted-foreground text-base">"{testimonial.quote}"</p>
                         </div>
                        <div className="flex items-center gap-4 pt-4">
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

      <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/70">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              Готовы навести чистоту?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Оставьте заявку, и наш менеджер свяжется с вами для обсуждения деталей и расчёта стоимости.
            </p>
          </div>
          <div className="mx-auto w-full max-w-md">
            <ContactForm />
          </div>
        </div>
      </section>

      <section id="contacts" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl font-headline mb-12">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">BeClean Pro</h3>
              <p className="text-muted-foreground text-lg">Мы всегда на связи, чтобы ответить на ваши вопросы.</p>
              <div className="space-y-3 text-lg">
                <p><strong>Адрес:</strong> г. Ташкент, ул. Амира Темура, 1</p>
                <p><strong>Телефон:</strong> <a href="tel:+998773566070" className="text-primary hover:underline font-semibold">+998 77 356 60 70</a></p>
                <p><strong>Email:</strong> <a href="mailto:info@beclean.pro" className="text-primary hover:underline font-semibold">info@beclean.pro</a></p>
                <p><strong>Часы работы:</strong> 24/7</p>
              </div>
            </div>
            <div>
              <a href="https://maps.google.com/?q=Tashkent" target="_blank" rel="noopener noreferrer">
                <Image
                  alt="Карта расположения офиса BeClean в Ташкенте"
                  className="rounded-xl object-cover w-full h-full min-h-[350px] shadow-lg"
                  height="400"
                  src={mapPlaceholder?.imageUrl || ''}
                  width="600"
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
