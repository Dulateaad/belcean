import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ListChecks } from 'lucide-react';
import { ContactForm } from '@/components/site/ContactForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { prices } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Уборка офисов в Ташкенте | BeClean Pro',
  description: 'Профессиональная уборка офисов в Ташкенте. Разовая, генеральная и абонентская уборка офисных помещений. Гарантия чистоты и порядка.',
};

const serviceName = 'Уборка офисов';
const serviceImage = PlaceHolderImages.find(p => p.id === 'service-office');

const whatsIncluded = [
  'Влажная уборка полов',
  'Удаление пыли со всех поверхностей',
  'Чистка и дезинфекция санузлов',
  'Вынос мусора',
  'Мытьё зеркал и стеклянных поверхностей',
  'Уборка кухни или зоны приёма пищи',
  'Чистка ковровых покрытий пылесосом',
  'Дезинфекция дверных ручек и выключателей',
];

const workProcess = [
    { title: 'Заявка', description: 'Вы оставляете заявку, мы уточняем детали.' },
    { title: 'Оценка', description: 'Бесплатный выезд менеджера для оценки.' },
    { title: 'Договор', description: 'Подписываем договор с графиком и перечнем работ.' },
    { title: 'Уборка', description: 'Наша команда выполняет работу качественно и в срок.' },
    { title: 'Приёмка', description: 'Вы принимаете работу, мы получаем обратную связь.' },
];

const faqItems = [
  { question: 'Как часто нужно убирать офис?', answer: 'Частота уборки зависит от проходимости и размера офиса. Стандартный вариант — ежедневная поддерживающая уборка. Мы можем составить индивидуальный график.' },
  { question: 'Используете ли вы гипоаллергенные средства?', answer: 'Да, по запросу мы используем сертифицированные гипоаллергенные и экологически чистые моющие средства, безопасные для сотрудников.' },
  { question: 'Можно ли заказать уборку в нерабочее время?', answer: 'Конечно. Мы можем проводить уборку утром до начала рабочего дня, вечером после его окончания или в выходные, чтобы не мешать вашим сотрудникам.' },
];


export default function ServicePage() {
  const priceItem = prices.find(p => p.name.includes('Разовая уборка'));
  return (
    <div className="bg-background">
      <div className="container py-12 md:py-24">
         <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-4">{serviceName}</h1>
                  <p className="text-xl text-muted-foreground">
                      Мы обеспечиваем идеальную чистоту в вашем офисе, создавая комфортную и здоровую рабочую атмосферу для ваших сотрудников и посетителей.
                  </p>
              </div>
              {serviceImage && (
                  <Image
                  alt={serviceName}
                  className="rounded-xl object-cover w-full aspect-video shadow-lg"
                  height={400}
                  src={serviceImage.imageUrl}
                  width={600}
                  data-ai-hint={serviceImage.imageHint}
                  />
              )}
         </div>

        <div className="grid md:grid-cols-3 gap-12 mt-16 md:mt-24">
          <div className="md:col-span-2">
            <section id="included" className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3"><ListChecks className="w-8 h-8 text-primary"/>Что входит в услугу</h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {whatsIncluded.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="process" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Процесс работы</h2>
              <div className="flex flex-col gap-6">
                   {workProcess.map((step, index) => (
                       <div key={index} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">{index + 1}</div>
                          <div>
                              <h3 className="font-semibold text-lg">{step.title}</h3>
                              <p className="text-muted-foreground">{step.description}</p>
                          </div>
                       </div>
                   ))}
              </div>
            </section>

            <section id="faq">
              <h2 className="text-3xl font-bold mb-6">Часто задаваемые вопросы</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-base">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          <aside className="md:col-span-1 space-y-8 sticky top-24 self-start">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Примерные цены</CardTitle>
              </CardHeader>
              <CardContent>
                  {priceItem && (
                      <div className="space-y-2">
                          <p className="text-lg">{priceItem.name}</p>
                          <p className="text-3xl font-bold text-primary">{priceItem.price}</p>
                      </div>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">Точная цена зависит от площади и сложности работ.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary">
               <CardHeader>
                  <CardTitle className="text-2xl">Заказать уборку офиса</CardTitle>
               </CardHeader>
               <CardContent>
                  <ContactForm defaultService={serviceName} />
               </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
