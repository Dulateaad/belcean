'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calculator, Phone } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { useDictionary } from '@/contexts/dictionary-context';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as constants from '@/lib/constants';

export function FloatingInquiry() {
  const t = useDictionary();
  const tFloating = t.FloatingInquiry;
  const prices = constants.getPrices(t);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <TooltipProvider delayDuration={100}>
          <Tooltip>
              <TooltipTrigger asChild>
                  <Button asChild size="icon" className="h-14 w-14 rounded-full shadow-lg animate-pulse-glow bg-green-600 hover:bg-green-700 text-white">
                      <a href="tel:+998773566070" aria-label={tFloating.call}>
                          <Phone className="h-7 w-7" />
                      </a>
                  </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                  <p>{tFloating.call}</p>
              </TooltipContent>
          </Tooltip>
      </TooltipProvider>

      <Dialog onOpenChange={(open) => !open && setSubmitted(false)}>
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button
                        size="icon"
                        className="h-16 w-16 rounded-full shadow-lg animate-pulse-glow bg-orange-500 hover:bg-orange-600 text-white"
                        >
                        <Calculator className="h-8 w-8" />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p>{tFloating.aria_label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {submitted ? tFloating.thank_you_title : tFloating.title}
            </DialogTitle>
            {!submitted && (
              <DialogDescription>
                {tFloating.description}
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="space-y-6 pt-2">
            {submitted ? (
              <div className="space-y-4">
                <p className="text-muted-foreground text-center">
                  {tFloating.thank_you}
                </p>
                <div className="rounded-xl border bg-muted/30 p-4 space-y-2">
                  <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    {tFloating.prices_label}
                  </p>
                  {prices.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-bold text-primary">
                        {new Intl.NumberFormat('ru-RU').format(item.price)} {t.HomePage.pricing_unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ContactForm noRedirect onSuccess={() => setSubmitted(true)} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
