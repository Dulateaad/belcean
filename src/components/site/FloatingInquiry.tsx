'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Phone } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { useDictionary } from '@/contexts/dictionary-context';

export function FloatingInquiry() {
  const t = useDictionary().FloatingInquiry;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg animate-pulse-glow"
          aria-label={t.aria_label}
        >
          <Phone className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t.title}</DialogTitle>
          <DialogDescription>
            {t.description}
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          <ContactForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
