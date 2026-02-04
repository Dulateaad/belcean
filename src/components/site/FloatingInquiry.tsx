'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Phone, Calculator, Wand2 } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { useDictionary } from '@/contexts/dictionary-context';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function FloatingInquiry() {
  const t = useDictionary();
  const tFloating = t.FloatingInquiry;
  const tHome = t.HomePage;
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'ru';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <TooltipProvider delayDuration={100}>
          <Tooltip>
              <TooltipTrigger asChild>
                  <Button asChild variant="secondary" size="icon" className="h-14 w-14 rounded-full shadow-lg animate-pulse-glow">
                      <Link href={`/${locale}/calculator`} aria-label={tHome.calculate_button}>
                          <Calculator className="h-7 w-7" />
                      </Link>
                  </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                  <p>{tHome.calculate_button}</p>
              </TooltipContent>
          </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={100}>
          <Tooltip>
              <TooltipTrigger asChild>
                  <Button asChild variant="secondary" size="icon" className="h-14 w-14 rounded-full shadow-lg animate-pulse-glow">
                      <Link href={`/${locale}/quiz`} aria-label={tHome.pick_service_button}>
                          <Wand2 className="h-7 w-7" />
                      </Link>
                  </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                  <p>{tHome.pick_service_button}</p>
              </TooltipContent>
          </Tooltip>
      </TooltipProvider>

      <Dialog>
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button
                        variant="default"
                        size="icon"
                        className="h-16 w-16 rounded-full shadow-lg animate-pulse-glow"
                        >
                        <Phone className="h-8 w-8" />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p>{tFloating.aria_label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{tFloating.title}</DialogTitle>
            <DialogDescription>
              {tFloating.description}
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4">
            <ContactForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
