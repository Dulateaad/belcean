// @ts-nocheck
"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { submitCalculatorInquiry } from "@/lib/actions";
import { CheckCircle } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';

export default function CalculatorPage() {
  const t = useDictionary().CalculatorPage;

  const cleaningTypes = [
    { value: 'regular', label: t.cleaning_types.regular, pricePerSqm: 4000 },
    { value: 'general', label: t.cleaning_types.general, pricePerSqm: 10000 },
    { value: 'post-construction', label: t.cleaning_types['post-construction'], pricePerSqm: 15000 },
    { value: 'subscription', label: t.cleaning_types.subscription, pricePerSqm: 60000 },
  ];

  const frequencies = [
    { value: 'once', label: t.frequencies.once, multiplier: 1 },
    { value: 'weekly', label: t.frequencies.weekly, multiplier: 4 },
    { value: 'bi-weekly', label: t.frequencies['bi-weekly'], multiplier: 8 },
    { value: 'daily', label: t.frequencies.daily, multiplier: 22 },
  ];

  const formSchema = z.object({
    name: z.string().min(2, { message: "Имя должно быть не менее 2 символов." }),
    phone: z.string().min(7, { message: "Пожалуйста, введите корректный номер телефона." }),
  });

  type ContactFormValues = z.infer<typeof formSchema>;
    
  const [area, setArea] = useState(100);
  const [propertyType, setPropertyType] = useState('office');
  const [cleaningType, setCleaningType] = useState(cleaningTypes[0].value);
  const [frequency, setFrequency] = useState(frequencies[0].value);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "" },
  });

  const estimatedCost = useMemo(() => {
    const selectedCleaning = cleaningTypes.find(c => c.value === cleaningType);
    const selectedFrequency = frequencies.find(f => f.value === frequency);
    if (!selectedCleaning || !selectedFrequency) return 0;
    
    if(selectedCleaning.value === 'subscription') {
        return area * selectedCleaning.pricePerSqm;
    }

    return area * selectedCleaning.pricePerSqm * selectedFrequency.multiplier;
  }, [area, cleaningType, frequency, cleaningTypes, frequencies]);

  async function onSubmit(data: ContactFormValues) {
    const selectedCleaning = cleaningTypes.find(c => c.value === cleaningType);
    const selectedFrequency = frequencies.find(f => f.value === frequency);
    const inquiryData = {
        ...data,
        service: selectedCleaning?.label || 'Не выбрано',
        details: `Тип объекта: ${propertyType}, Площадь: ${area} м², Периодичность: ${cleaningType === 'subscription' ? 'Абонемент' : selectedFrequency?.label}`
    };

    try {
        const result = await submitCalculatorInquiry(inquiryData);
        if (result.success) {
            setIsSubmitted(true);
        } else {
            toast({
                variant: "destructive",
                title: "Ошибка отправки",
                description: result.message || "Произошла ошибка при отправке формы.",
            });
        }
    } catch (error) {
         toast({
            variant: "destructive",
            title: "Ошибка",
            description: "Не удалось связаться с сервером.",
        });
    }
  }

  const calculatorImage = PlaceHolderImages.find(p => p.id === 'calculator-hero');

  return (
    <div className="bg-background">
      <div className="container py-12 md:py-24">
         <div className="text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
                  {t.title}
              </h1>
              <p className="max-w-[700px] mx-auto mt-4 text-muted-foreground md:text-xl">
                  {t.subtitle}
              </p>
          </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <Card className="p-4 sm:p-6">
              <CardContent className="space-y-8 pt-6">
                <div className="space-y-4">
                  <Label htmlFor="property-type" className="text-lg font-semibold">{t.property_type_label}</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger id="property-type" className="h-12 text-base">
                      <SelectValue placeholder={t.property_type_label} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">{t.property_types.office}</SelectItem>
                      <SelectItem value="business-center">{t.property_types.business_center}</SelectItem>
                      <SelectItem value="shop">{t.property_types.shop}</SelectItem>
                      <SelectItem value="clinic">{t.property_types.clinic}</SelectItem>
                      <SelectItem value="warehouse">{t.property_types.warehouse}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <Label htmlFor="area" className="text-lg font-semibold">{t.area_label}</Label>
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
                  <Label htmlFor="cleaning-type" className="text-lg font-semibold">{t.cleaning_type_label}</Label>
                   <Select value={cleaningType} onValueChange={setCleaningType}>
                    <SelectTrigger id="cleaning-type" className="h-12 text-base">
                      <SelectValue placeholder={t.cleaning_type_label} />
                    </SelectTrigger>
                    <SelectContent>
                      {cleaningTypes.map(ct => <SelectItem key={ct.value} value={ct.value}>{ct.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {cleaningType !== 'subscription' && (
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">{t.frequency_label}</Label>
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
              {!isSubmitted ? (
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{t.form_title}</CardTitle>
                        <CardDescription>{t.form_subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="sr-only">Имя</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Ваше имя" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="phone"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="sr-only">Телефон</FormLabel>
                                      <FormControl>
                                        <Input placeholder="+998 XX XXX XX XX" type="tel" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                                  {form.formState.isSubmitting ? t.submitting_button : t.submit_button}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                 </Card>
              ) : (
                <Card className="bg-secondary/70 text-center flex flex-col justify-center">
                    <CardHeader>
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2"/>
                      <CardTitle className="text-2xl">{t.submitted_card_title}</CardTitle>
                      <CardDescription>{t.submitted_card_subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 rounded-lg bg-background shadow">
                          <p className="text-sm text-muted-foreground">{t.estimated_cost_label}</p>
                          <p className="text-5xl font-bold text-primary">
                            {estimatedCost.toLocaleString('ru-RU')} {t.cost_unit}
                          </p>
                          <p className="font-semibold text-lg">
                            {cleaningType === 'subscription' && t.per_month}
                          </p>
                      </div>
                    </CardContent>
                </Card>
              )}

              {calculatorImage && !isSubmitted && (
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
      </div>
    </div>
  );
}
