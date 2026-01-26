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
    <>
    <div className="container py-12 md:py-24">
       <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
                Калькулятор стоимости
            </h1>
            <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
                Рассчитайте примерную стоимость клининговых услуг для вашего объекта за пару минут.
            </p>
        </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Параметры уборки</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <Label htmlFor="property-type">Тип объекта</Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger id="property-type">
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
                <Label htmlFor="area">Площадь (м²)</Label>
                <span className="font-bold text-2xl">{area} м²</span>
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
              <Label htmlFor="cleaning-type">Вид уборки</Label>
               <Select value={cleaningType} onValueChange={setCleaningType}>
                <SelectTrigger id="cleaning-type">
                  <SelectValue placeholder="Выберите вид уборки" />
                </SelectTrigger>
                <SelectContent>
                  {cleaningTypes.map(ct => <SelectItem key={ct.value} value={ct.value}>{ct.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {cleaningType !== 'subscription' && (
              <div className="space-y-4">
                <Label>Периодичность</Label>
                <RadioGroup value={frequency} onValueChange={setFrequency} className="grid grid-cols-2 gap-4">
                  {frequencies.map(freq => (
                    <div key={freq.value}>
                       <RadioGroupItem value={freq.value} id={freq.value} className="peer sr-only"/>
                       <Label htmlFor={freq.value} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                         {freq.label}
                       </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="space-y-8">
            {calculatorImage && (
                <Image
                    alt="Калькулятор"
                    className="rounded-lg object-cover w-full aspect-video"
                    height="310"
                    src={calculatorImage.imageUrl}
                    width="550"
                    data-ai-hint={calculatorImage.imageHint}
                />
            )}
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle>Примерная стоимость</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-4xl font-bold">
                  {estimatedCost.toLocaleString('ru-RU')} сум
                  {cleaningType === 'subscription' && ' / месяц'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Это предварительный расчет. Точная стоимость будет определена после осмотра объекта нашим менеджером.
                </p>
              </CardContent>
            </Card>
        </div>
      </div>

       <div id="cta-calculator" className="w-full mt-16 py-12 md:py-16 bg-secondary/50 rounded-lg">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                        Получите точный расчет
                    </h2>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                        Оставьте свои контактные данные, и мы свяжемся с вами для бесплатного осмотра и составления точной сметы.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-md">
                    <ContactForm defaultService={cleaningTypes.find(c => c.value === cleaningType)?.label} />
                </div>
            </div>
        </div>
    </div>
    </>
  );
}
