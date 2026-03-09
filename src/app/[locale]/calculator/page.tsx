
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
import { CheckCircle, Info } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';

export default function CalculatorPage() {
  const t = useDictionary().CalculatorPage;

  const cleaningTypes = [
    { value: 'regular', label: t.cleaning_types.regular, minPrice: 6000, maxPrice: 8000 },
    { value: 'general', label: t.cleaning_types.general, minPrice: 9000, maxPrice: 10000 },
    { value: 'post-construction', label: t.cleaning_types['post-construction'], minPrice: 11000, maxPrice: 15000 },
  ];

  const formSchema = z.object({
    name: z.string().min(2, { message: "Имя должно быть не менее 2 символов." }),
    phone: z.string().min(7, { message: "Пожалуйста, введите корректный номер телефона." }),
  });

  type ContactFormValues = z.infer<typeof formSchema>;
    
  const [area, setArea] = useState(100);
  const [propertyType, setPropertyType] = useState('office');
  const [cleaningType, setCleaningType] = useState(cleaningTypes[0].value);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "" },
  });

  const { formState: { isSubmitting } } = form;

  const estimatedRange = useMemo(() => {
    const selectedCleaning = cleaningTypes.find(c => c.value === cleaningType);
    if (!selectedCleaning) return { min: 0, max: 0 };
    
    return {
        min: area * selectedCleaning.minPrice,
        max: area * selectedCleaning.maxPrice
    };
  }, [area, cleaningType, cleaningTypes]);

  async function onSubmit(data: ContactFormValues) {
    const selectedCleaning = cleaningTypes.find(c => c.value === cleaningType);
    const inquiryData = {
        ...data,
        service: selectedCleaning?.label || 'Не выбрано',
        details: `Тип объекта: ${propertyType}, Площадь: ${area} м², Расчет: ${estimatedRange.min.toLocaleString()} - ${estimatedRange.max.toLocaleString()} сум`
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

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                        {t.contact_note}
                    </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2 space-y-8 sticky top-24 self-start">
              {isSubmitting ? (
                 <div className="flex justify-center items-center min-h-[300px]">
                    <dotlottie-wc 
                        src="https://lottie.host/e77a7057-00fa-4005-87a6-9e4cf5d9f4c1/JoYgNJl1b6.lottie" 
                        style={{ width: '300px', height: '300px' }} 
                        autoplay 
                        loop>
                    </dotlottie-wc>
                  </div>
              ) : !isSubmitted ? (
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{t.form_title}</CardTitle>
                        <CardDescription>{t.form_subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" suppressHydrationWarning>
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
                                <Button type="submit" size="lg" className="w-full">
                                  {t.submit_button}
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
                      <div className="p-6 rounded-xl bg-background shadow-xl border border-primary/20">
                          <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-2">{t.estimated_cost_label}</p>
                          <p className="text-3xl md:text-4xl font-black text-primary leading-tight">
                            {estimatedRange.min.toLocaleString('ru-RU')} — {estimatedRange.max.toLocaleString('ru-RU')}
                          </p>
                          <p className="text-xl font-bold text-primary/80 mt-1">{t.cost_unit}</p>
                      </div>
                    </CardContent>
                </Card>
              )}

              {calculatorImage && !isSubmitted && !isSubmitting && (
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
