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
} from 'lucide-react';
import { ContactForm } from '@/components/site/ContactForm';
import { services, testimonials, clientTypes, whyBeClean, howItWorks } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export default function Home() {
  const mapPlaceholder = PlaceHolderImages.find(p => p.id === 'map');

  return (
    <div className="flex flex-col min-h-screen">
      <section id="hero" className="w-full py-20 md:py-32 lg:py-40 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Профессиональный клининг для бизнеса в Ташкенте
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Офисы, БЦ, клиники. Договор. Контроль качества.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/calculator">Рассчитать стоимость</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="#cta">Заказать тестовую уборку</Link>
                </Button>
              </div>
            </div>
            <Image
              alt="Cleaning professional at work"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              height="400"
              src={PlaceHolderImages.find(p => p.id === 'hero')?.imageUrl || ''}
              width="600"
              data-ai-hint="professional cleaner"
            />
          </div>
        </div>
      </section>

      <section id="clients" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Кому мы подходим</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Мы предоставляем качественные клининговые услуги для различных типов коммерческих объектов.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-center gap-6 py-12">
            {clientTypes.map((client, index) => (
              <div key={index} className="flex flex-col items-center gap-2 text-center">
                <div className="bg-secondary rounded-full p-4">
                  <client.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-lg font-semibold">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline mb-12">Наши услуги</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const serviceImage = PlaceHolderImages.find(p => p.id === service.imageId);
              return (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                         <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                     <Image
                        alt={service.title}
                        className="rounded-lg object-cover w-full aspect-[4/3] mb-4"
                        height="225"
                        src={serviceImage?.imageUrl || ''}
                        width="400"
                        data-ai-hint={serviceImage?.imageHint}
                      />
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0 h-auto">
                      <Link href={service.slug}>Подробнее →</Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline mb-12">Как мы работаем</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
            <div className="grid gap-y-12">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative">
                  <div className="md:hidden flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold z-10 mt-1">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground mt-1">{step.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:grid md:grid-cols-2 md:gap-8 items-center">
                    {index % 2 === 0 ? (
                      <>
                        <div className="text-right">
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                          <p className="text-muted-foreground mt-2">{step.description}</p>
                        </div>
                        <div></div>
                      </>
                    ) : (
                      <>
                        <div></div>
                        <div>
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                          <p className="text-muted-foreground mt-2">{step.description}</p>
                        </div>
                      </>
                    )}
                    <div className="absolute w-full h-full flex justify-center items-center pointer-events-none">
                       <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold z-10 border-8 border-background">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline mb-12">Почему BeClean</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyBeClean.map((reason, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <reason.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline mb-12">Отзывы наших клиентов</h2>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="sm:basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                         <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-muted-foreground">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-4">
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              Готовы навести чистоту?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Оставьте заявку, и наш менеджер свяжется с вами для обсуждения деталей и расчёта стоимости.
            </p>
          </div>
          <div className="mx-auto w-full max-w-md">
            <ContactForm />
          </div>
        </div>
      </section>

      <section id="contacts" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline mb-12">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">BeClean Pro</h3>
              <p className="text-muted-foreground">Мы всегда на связи, чтобы ответить на ваши вопросы.</p>
              <div className="space-y-2">
                <p><strong>Адрес:</strong> г. Ташкент, ул. Амира Темура, 1</p>
                <p><strong>Телефон:</strong> <a href="tel:+998712000000" className="text-primary hover:underline">+998 71 200 00 00</a></p>
                <p><strong>Email:</strong> <a href="mailto:info@beclean.pro" className="text-primary hover:underline">info@beclean.pro</a></p>
                <p><strong>Часы работы:</strong> Пн-Пт с 9:00 до 18:00</p>
              </div>
            </div>
            <div>
              <a href="https://maps.google.com/?q=Tashkent" target="_blank" rel="noopener noreferrer">
                <Image
                  alt="Карта расположения офиса BeClean в Ташкенте"
                  className="rounded-lg object-cover w-full h-full min-h-[300px]"
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
