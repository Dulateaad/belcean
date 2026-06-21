'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle2, Info, Calculator, Phone, Sparkles } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';
import { onTelLinkClick, PHONE_TEL_HREF } from '@/lib/phone-conversion';
import { cn } from '@/lib/utils';

function CalculatorContent() {
  const d = useDictionary();
  const t = d.CalculatorPage;
  const prices = d.Constants.prices;
  const searchParams = useSearchParams();
  const submitted = searchParams.get('submitted') === '1';

  const [area, setArea] = useState(100);
  const [service, setService] = useState('cleaning');

  const currentService = useMemo(
    () => prices.find((p: { id: string }) => p.id === service) || prices[0],
    [service, prices],
  );

  const totalPrice = useMemo(() => area * currentService.price, [area, currentService]);
  const formattedTotal = new Intl.NumberFormat('ru-RU').format(totalPrice);

  return (
    <div className="bg-background">
      <div className="container animate-fade-in py-12 md:py-24">
        {submitted ? (
          <div className="mx-auto mb-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
            <div>
              <p className="font-semibold text-lg">{t.submitted_banner_title}</p>
              <p className="mt-1 text-sm leading-relaxed text-emerald-800/90">{t.submitted_banner_subtitle}</p>
            </div>
          </div>
        ) : null}

        <div className="mb-16 text-center">
          <h1 className="flex items-center justify-center gap-4 font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            <Calculator className="h-10 w-10 text-primary" /> {t.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">{t.subtitle}</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          <Card className="border-primary/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">1. {d.Header.services}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={service}
                onValueChange={setService}
                className="grid gap-4 md:grid-cols-3"
              >
                {prices.map((item: { id: string; name: string; price: number }) => (
                  <div key={item.id}>
                    <RadioGroupItem value={item.id} id={item.id} className="peer sr-only" />
                    <Label
                      htmlFor={item.id}
                      className={cn(
                        'flex h-full cursor-pointer flex-col items-start rounded-xl border-2 border-muted bg-popover p-4 transition-all hover:bg-accent',
                        'peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5',
                      )}
                    >
                      <span className="mb-1 text-lg font-bold">{item.name}</span>
                      <span className="mt-4 font-black text-primary">
                        {new Intl.NumberFormat('ru-RU').format(item.price)} {d.HomePage.pricing_unit}/м²
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">2. {t.area_label}</CardTitle>
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
                <div className="relative w-32">
                  <Input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="pr-8 text-right font-bold"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">м²</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary p-8 text-primary-foreground shadow-xl md:flex-row">
            <div>
              <p className="mb-1 text-sm font-medium uppercase tracking-wider text-primary-foreground/80">
                {t.total_label}
              </p>
              <h2 className="text-4xl font-black md:text-5xl">
                {formattedTotal}{' '}
                <span className="text-2xl opacity-80">{d.HomePage.pricing_unit}</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-bold">{t.note_title}</span>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-6 text-center shadow-lg sm:p-8">
            <p className="font-headline text-2xl font-bold text-emerald-900 sm:text-3xl">{t.call_cta_title}</p>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-emerald-800/90 sm:text-base">
              {t.call_cta_text}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 h-auto w-full max-w-md gap-2 rounded-2xl bg-emerald-600 px-8 py-6 text-lg font-bold text-white shadow-md hover:bg-emerald-700 sm:text-xl"
            >
              <a href={PHONE_TEL_HREF} onClick={(e) => onTelLinkClick(e)}>
                <Phone className="h-6 w-6 shrink-0" />
                {t.call_cta_button}
              </a>
            </Button>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="rounded-full bg-primary/10 p-2">
              <Info className="h-6 w-6 shrink-0 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold">{t.note_title}</p>
              <p className="text-muted-foreground">{t.note_description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="container py-24 text-center text-muted-foreground">Загрузка...</div>}>
      <CalculatorContent />
    </Suspense>
  );
}
