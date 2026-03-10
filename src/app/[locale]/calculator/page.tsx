"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ContactForm } from "@/components/site/ContactForm";
import { Info, CheckCircle2, Calculator, Sparkles } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';
import { cn } from '@/lib/utils';

export default function CalculatorPage() {
  const d = useDictionary();
  const t = d.CalculatorPage;
  
  const [area, setArea] = useState(100);
  const [service, setService] = useState('cleaning');

  const pricingConfig = {
    cleaning: {
      id: 'cleaning',
      label: d.CalculatorPage.cleaning_types.regular || 'Уборка',
      price: 20000,
      description: 'Профессиональная уборка помещений'
    },
    facade: {
      id: 'facade',
      label: d.ServicePageMoikaOkon.service_name || 'Фасад',
      price: 16000,
      description: 'Мойка фасадов и остекления'
    },
    drycleaning: {
      id: 'drycleaning',
      label: d.ServicePageHimchistka.service_name || 'Химчистка',
      price: 15000,
      description: 'Глубокая чистка покрытий'
    }
  };

  const currentService = pricingConfig[service as keyof typeof pricingConfig];
  const totalPrice = useMemo(() => area * currentService.price, [area, currentService]);
  const formattedTotal = new Intl.NumberFormat('ru-RU').format(totalPrice);

  return (
    <div className="bg-background">
      <div className="container py-12 md:py-24 animate-fade-in">
         <div className="text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline flex items-center justify-center gap-4">
                  <Calculator className="w-10 h-10 text-primary" /> {t.title}
              </h1>
              <p className="max-w-[700px] mx-auto mt-4 text-muted-foreground md:text-xl">
                  {t.subtitle}
              </p>
          </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-8">
            <Card className="border-primary/10 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">1. {d.Header.services}</CardTitle>
                </CardHeader>
                <CardContent>
                    <RadioGroup 
                        value={service} 
                        onValueChange={setService}
                        className="grid md:grid-cols-3 gap-4"
                    >
                        {Object.values(pricingConfig).map((item) => (
                            <div key={item.id}>
                                <RadioGroupItem value={item.id} id={item.id} className="peer sr-only" />
                                <Label
                                    htmlFor={item.id}
                                    className={cn(
                                        "flex flex-col items-start p-4 rounded-xl border-2 border-muted bg-popover hover:bg-accent cursor-pointer transition-all h-full",
                                        "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                                    )}
                                >
                                    <span className="font-bold text-lg mb-1">{item.label}</span>
                                    <span className="text-xs text-muted-foreground leading-tight">{item.description}</span>
                                    <span className="mt-4 text-primary font-black">{new Intl.NumberFormat('ru-RU').format(item.price)} сум/м²</span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">2. {d.QuizPage.area_title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <Slider
                                value={[area]}
                                onValueChange={(val) => setArea(val[0])}
                                max={2000}
                                min={10}
                                step={10}
                                className="py-4"
                            />
                        </div>
                        <div className="w-32 relative">
                            <Input 
                                type="number" 
                                value={area} 
                                onChange={(e) => setArea(Number(e.target.value))}
                                className="text-right pr-8 font-bold"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">м²</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="p-8 rounded-2xl bg-primary text-primary-foreground shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <p className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm mb-1">{d.HomePage.pricing_title}</p>
                    <h2 className="text-4xl md:text-5xl font-black">{formattedTotal} <span className="text-2xl opacity-80">сум</span></h2>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-bold">Точный расчет после осмотра</span>
                </div>
            </div>

            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-4">
                <Info className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                    <p className="font-bold text-lg">{t.contact_note}</p>
                    <p className="text-muted-foreground">
                        Окончательная стоимость зависит от сложности работ. 
                        Наш менеджер приедет к вам для бесплатного осмотра и назовет точную цену.
                    </p>
                </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8 sticky top-24 self-start">
             <Card className="shadow-xl border-primary/10 overflow-hidden">
                <CardHeader className="bg-primary/5 border-b mb-6">
                    <CardTitle className="text-2xl">{t.form_title}</CardTitle>
                    <CardDescription>{t.form_subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm 
                        defaultService={`${currentService.label} (${area} м²)`} 
                    />
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
