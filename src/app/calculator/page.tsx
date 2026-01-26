"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ContactForm } from '@/components/site/ContactForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const cleaningTypes = [
  { value: 'regular', label: 'Разовая уборка', pricePerSqm: 4000 },
  { value: 'general', label: 'Генеральная уборка', pricePerSqm: 10000 },
  { value: 'post-construction', label: 'Послестроительная уборка', pricePerSqm: 15000 },
  { value: 'subscription', label: 'Абонентский клининг', pricePerSqm: 60000 }, // price per sqm/month
];

const frequencies = [
  { value: 'once', label: 'Один раз', multiplier: 1 },
  { value: 'weekly', label: 'Раз в неделю', multiplier: 4 },
  { value: 'bi-weekly', label: '2 раза в неделю', multiplier: 8 },
  { value: 'daily', label: 'Каждый день (5/2)', multiplier: 22 },
];

export default function CalculatorPage() {
  const [area, setArea] = useState(100);
  const [propertyType, setPropertyType] = useState('office');
  const [cleaningType, setCleaningType] = useState(cleaningTypes[0].value);
  const [frequency, setFrequency] = useState(frequencies[0].value);

  const estimatedCost = useMemo(() => {
    const selectedCleaning = cleaningTypes.find(c => c.value === cleaningType);
    const selectedFrequency = frequencies.find(f => f.value === frequency);
    if (!selectedCleaning || !selectedFrequency) return 0;
    
    if(selectedCleaning.value === 'subscription') {
        return area * selectedCleaning.pricePerSqm;
    }

    return area * selectedCleaning.pricePerSqm * selectedFrequency.multiplier;
  }, [area, cleaningType, frequency]);

  const calculatorImage = PlaceHolderImages.find(p => p.id === 'calculator-hero');

  return (
    <div className="bg-background">
      <div className="container py-12 md:py-24">
         <div className="text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Калькулятор стоимости
              </h1>
              <p className="max-w-[700px] mx-auto mt-4 text-muted-foreground md:text-xl">
                  Рассчитайте примерную стоимость клининговых услуг для вашего объекта за пару минут. Точная цена будет определена после бесплатного осмотра.
              </p>
          </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <Card className="p-4 sm:p-6">
              <CardContent className="space-y-8 pt-6">
                <div className="space-y-4">
                  <Label htmlFor="property-type" className="text-lg font-semibold">Тип объекта</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger id="property-type" className="h-12 text-base">
                      <SelectValue placeholder="Выберите тип объекта" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Офис</SelectItem>
                      <SelectItem value="business-center">Бизнес-центр</SelectItem>
                      <SelectItem value="shop">Магазин</SelectItem>
                      <SelectItem value="clinic">Клиника</SelectItem>
                      <SelectItem value="warehouse">Склад</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <Label htmlFor="area" className="text-lg font-semibold">Площадь</Label>
                    <span className="font-bold text-3xl text-primary">{area} м²</span>
                  </div>
                  <Slider
                    id="area"
                    min={10}
                    max={2000}
                    step={10}
                    value={[area]}
                    onValueChange={(value) => setArea(value[0])}
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="cleaning-type" className="text-lg font-semibold">Вид уборки</Label>
                   <Select value={cleaningType} onValueChange={setCleaningType}>
                    <SelectTrigger id="cleaning-type" className="h-12 text-base">
                      <SelectValue placeholder="Выберите вид уборки" />
                    </SelectTrigger>
                    <SelectContent>
                      {cleaningTypes.map(ct => <SelectItem key={ct.value} value={ct.value}>{ct.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {cleaningType !== 'subscription' && (
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Периодичность</Label>
                    <RadioGroup value={frequency} onValueChange={setFrequency} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {frequencies.map(freq => (
                        <div key={freq.value}>
                           <RadioGroupItem value={freq.value} id={freq.value} className="peer sr-only"/>
                           <Label htmlFor={freq.value} className={cn(
                             "flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 h-24 text-center text-base",
                             "hover:bg-accent hover:text-accent-foreground cursor-pointer",
                             "peer-data-[state=checked]:border-primary peer-data-[state=checked]:shadow-md"
                           )}>
                             {freq.label}
                           </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2 space-y-8 sticky top-24 self-start">
              <Card className="bg-secondary/70">
                <CardHeader>
                  <CardTitle className="text-2xl">Примерная стоимость</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-5xl font-bold text-primary">
                    {estimatedCost.toLocaleString('ru-RU')} сум
                  </p>
                  <p className="font-semibold text-xl">
                    {cleaningType === 'subscription' && 'в месяц'}
                  </p>
                  <p className="text-sm text-muted-foreground pt-4">
                    Это предварительный расчет. Точная стоимость будет определена после осмотра объекта нашим менеджером.
                  </p>
                </CardContent>
              </Card>

              {calculatorImage && (
                  <Image
                      alt="Калькулятор"
                      className="rounded-xl object-cover w-full aspect-video shadow-lg"
                      height="310"
                      src={calculatorImage.imageUrl}
                      width="550"
                      data-ai-hint={calculatorImage.imageHint}
                  />
              )}
          </div>
        </div>

        <div id="cta-calculator" className="w-full mt-16 md:mt-24 py-12 md:py-16 bg-secondary/70 rounded-xl">
              <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                  <div className="space-y-3">
                      <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                          Получите точный расчет и персональное предложение
                      </h2>
                      <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                          Оставьте свои контактные данные, и мы свяжемся с вами для бесплатного осмотра объекта и составления точной сметы.
                      </p>
                  </div>
                  <div className="mx-auto w-full max-w-md">
                      <ContactForm 
                        defaultService={cleaningTypes.find(c => c.value === cleaningType)?.label} 
                        />
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
