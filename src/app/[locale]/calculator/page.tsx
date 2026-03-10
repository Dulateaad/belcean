
// @ts-nocheck
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ContactForm } from "@/components/site/ContactForm";
import { Info, CheckCircle2, Calculator } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';

export default function CalculatorPage() {
  const t = useDictionary().CalculatorPage;

  const pricingData = [
    {
      title: "Уборка",
      price: "20 000",
      description: "Профессиональная уборка помещений любой сложности."
    },
    {
      title: "Фасад",
      price: "16 000",
      description: "Мойка фасадов, витрин и остекления зданий."
    },
    {
      title: "Химчистка",
      price: "15 000",
      description: "Глубокая чистка мягкой мебели и ковровых покрытий."
    }
  ];

  return (
    <div className="bg-background">
      <div className="container py-12 md:py-24">
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
            <div className="grid gap-6">
                {pricingData.map((item, index) => (
                    <Card key={index} className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-primary whitespace-nowrap">
                                        от {item.price}
                                    </div>
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        сум / м²
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-4">
                <Info className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                    <p className="font-bold text-lg">{t.contact_note}</p>
                    <p className="text-muted-foreground">
                        Окончательная стоимость зависит от степени загрязнения, наличия мебели и сложности работ. 
                        Наш менеджер приедет к вам для бесплатного осмотра и назовет точную цену.
                    </p>
                </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8 sticky top-24 self-start">
             <Card className="shadow-xl border-primary/10">
                <CardHeader className="bg-primary/5 border-b mb-6">
                    <CardTitle className="text-2xl">{t.form_title}</CardTitle>
                    <CardDescription>{t.form_subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
             </Card>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-4 bg-secondary rounded-xl text-center">
                    <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
                    <span className="text-sm font-bold leading-tight">Договор и гарантия</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-secondary rounded-xl text-center">
                    <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
                    <span className="text-sm font-bold leading-tight">Бесплатный выезд</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
