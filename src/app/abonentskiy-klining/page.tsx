import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle, ListChecks } from 'lucide-react';
import { ContactForm } from '@/components/site/ContactForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { prices } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Абонентский клининг в Ташкенте | BeClean Pro',
  description: 'Абонентское обслуживание и регулярный клининг для офисов и коммерческих помещений в Ташкенте. Составление индивидуального графика.',
};

const serviceName = 'Абонентский клининг';
const serviceImage = PlaceHolderImages.find(p => p.id === 'service-subscription');

const whatsIncluded = [
  'Ежедневная поддерживающая уборка',
  'Составление индивидуального графика',
  'Закрепление постоянной команды клинеров',
  'Регулярная поставка расходных материалов',
  'Периодическая генеральная уборка (по договору)',
  'Персональный менеджер',
  'Контроль качества по чек-листам',
  'Гибкие условия договора',
];

const workProcess = [
    { title: 'Консультация', description: 'Обсуждаем ваши требования и желаемую частоту уборки.' },
    { title: 'Осмотр и план', description: 'Составляем подробный план уборки и график.' },
    { title: 'Договор', description: 'Заключаем договор на абонентское обслуживание.' },
    { title: 'Регулярная уборка', description: 'Наша команда работает по согласованному графику.' },
    { title: 'Обратная связь', description: 'Регулярно связываемся для контроля качества.' },
];

const faqItems = [
  { question: 'Что входит в абонентское обслуживание?', answer: 'В абонентское обслуживание обычно входит ежедневная или регулярная поддерживающая уборка, поставка расходников и закрепление за вами команды. Точный перечень услуг прописывается в договоре.' },
  { question: 'Можно ли изменить график уборки?', answer: 'Да, мы гибко подходим к составлению графика и можем его корректировать по согласованию сторон.' },
  { question: 'Что если меня не устроит качество работы?', answer: 'За каждым объектом закреплен менеджер, который контролирует качество. Если у вас возникнут претензии, мы оперативно устраним все недочеты.' },
];


export default function ServicePage() {
  const priceItem = prices.find(p => p.name.includes('Абонентский клининг'));
  return (
    <div className="container py-12 md:py-24">
       <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-4">{serviceName}</h1>
                <p className="text-xl text-muted-foreground">
                    Поддерживайте чистоту на постоянной основе без лишних забот. Мы возьмем на себя все вопросы, связанные с клинингом вашего объекта.
                </p>
            </div>
            {serviceImage && (
                <Image
                alt={serviceName}
                className="rounded-lg object-cover w-full aspect-video"
                height={400}
                src={serviceImage.imageUrl}
                width={600}
                data-ai-hint={serviceImage.imageHint}
                />
            )}
       </div>

      <div className="grid md:grid-cols-5 gap-12 mt-16 md:mt-24">
        <div className="md:col-span-3">
          <section id="included" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3"><ListChecks className="w-8 h-8 text-primary"/>Что входит в услугу</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {whatsIncluded.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="process" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Процесс работы</h2>
            <div className="flex flex-col gap-4">
                 {workProcess.map((step, index) => (
                     <Card key={index}>
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">{index + 1}</div>
                            <div>
                                <h3 className="font-semibold">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        </CardContent>
                     </Card>
                 ))}
            </div>
          </section>

          <section id="faq">
            <h2 className="text-3xl font-bold mb-6">Часто задаваемые вопросы</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        <aside className="md:col-span-2 space-y-8 sticky top-24 self-start">
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-bold">Примерные цены</h3>
            </CardHeader>
            <CardContent>
                {priceItem && (
                    <div className="space-y-2">
                        <p className="text-lg">{priceItem.name}</p>
                        <p className="text-3xl font-bold">{priceItem.price}</p>
                    </div>
                )}
                <p className="text-sm text-muted-foreground mt-2">Стоимость рассчитывается индивидуально.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/50">
             <CardHeader>
                <h3 className="text-2xl font-bold">Заказать абонентский клининг</h3>
             </CardHeader>
             <CardContent>
                <ContactForm defaultService={serviceName} />
             </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
