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
  title: 'Химчистка мебели в Ташкенте | BeClean Pro',
  description: 'Профессиональная химчистка мягкой мебели, стульев, диванов и ковролина в офисах Ташкента. Удаление пятен и запахов.',
};

const serviceName = 'Химчистка мебели';
const serviceImage = PlaceHolderImages.find(p => p.id === 'service-furniture');

const whatsIncluded = [
  'Глубокая сухая чистка пылесосом',
  'Подбор чистящего средства под тип обивки',
  'Обработка и выведение пятен',
  'Экстракторная чистка всей поверхности',
  'Удаление неприятных запахов',
  'Промывка чистой водой и сушка',
  'Чистка диванов, кресел, стульев',
  'Химчистка ковролина',
];

const workProcess = [
    { title: 'Заявка', description: 'Вы оставляете заявку, мы уточняем детали.' },
    { title: 'Оценка', description: 'Бесплатный выезд менеджера для оценки.' },
    { title: 'Договор', description: 'Подписываем договор с графиком и перечнем работ.' },
    { title: 'Уборка', description: 'Наша команда выполняет работу качественно и в срок.' },
    { title: 'Приёмка', description: 'Вы принимаете работу, мы получаем обратную связь.' },
];

const faqItems = [
  { question: 'Сколько сохнет мебель после химчистки?', answer: 'Время высыхания зависит от типа ткани, температуры и влажности в помещении. В среднем, мебель полностью высыхает за 4-8 часов.' },
  { question: 'Все ли пятна можно вывести?', answer: 'Мы используем профессиональные пятновыводители и можем удалить большинство свежих и стандартных загрязнений. Результат для старых или специфических пятен (краска, клей) не всегда гарантирован, но мы сделаем всё возможное.' },
  { question: 'Это безопасно для аллергиков?', answer: 'Да, мы используем сертифицированные, гипоаллергенные средства. После чистки мы тщательно промываем обивку, удаляя все остатки химии.' },
];


export default function ServicePage() {
  const priceItem = prices.find(p => p.name.includes('Химчистка мебели'));
  return (
    <div className="container py-12 md:py-24">
       <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-4">{serviceName}</h1>
                <p className="text-xl text-muted-foreground">
                    Вернем вашей офисной мебели и ковровым покрытиям свежесть и чистоту. Удаляем пятна, пыль и неприятные запахи.
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
                <p className="text-sm text-muted-foreground mt-2">Цена зависит от типа и размера мебели/ковролина.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/50">
             <CardHeader>
                <h3 className="text-2xl font-bold">Заказать химчистку</h3>
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
