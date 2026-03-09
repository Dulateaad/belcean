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
import { Phone, Send } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { useDictionary } from '@/contexts/dictionary-context';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function FloatingInquiry() {
  const t = useDictionary();
  const tFloating = t.FloatingInquiry;
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'ru';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <TooltipProvider delayDuration={100}>
          <Tooltip>
              <TooltipTrigger asChild>
                  <Button asChild size="icon" className="h-14 w-14 rounded-full shadow-lg animate-pulse-glow bg-[#229ED9] hover:bg-[#1A88C2] text-white">
                      <Link href="https://t.me/beclean_manager" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                          <Send className="h-7 w-7" />
                      </Link>
                  </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                  <p>{tFloating.telegram}</p>
              </TooltipContent>
          </Tooltip>
      </TooltipProvider>

      <Dialog>
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button
                        size="icon"
                        className="h-16 w-16 rounded-full shadow-lg animate-pulse-glow bg-orange-500 hover:bg-orange-600 text-white"
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
        <DialogContent className="sm:max-w-[425px] top-[30%] sm:top-[50%]">
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
