'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useDictionary } from '@/contexts/dictionary-context';
import { HelpCircle } from 'lucide-react';

export function HomeFaqSection() {
  const h = useDictionary().HomePage;
  const faq = h.home_faq;
  const items = faq.items as { question: string; answer: string }[];

  return (
    <section id="faq" className="w-full scroll-mt-20 bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            {faq.badge}
          </p>
          <h2 className="mt-2 font-headline text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {faq.title}
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">{faq.subtitle}</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-2xl border border-border/80 bg-card px-4 shadow-sm data-[state=open]:border-emerald-200 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="gap-3 py-4 text-left text-base font-semibold hover:no-underline sm:text-lg">
                  <HelpCircle className="h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="flex-1">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pl-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
