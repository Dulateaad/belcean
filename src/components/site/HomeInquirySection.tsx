'use client';

import { ContactForm } from '@/components/site/ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { useDictionary } from '@/contexts/dictionary-context';
import { Clock, MessageSquare } from 'lucide-react';

export function HomeInquirySection() {
  const t = useDictionary();
  const h = t.HomePage;

  return (
    <section id="inquiry" className="w-full scroll-mt-20 bg-emerald-600 py-14 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="text-center text-white lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
              <MessageSquare className="h-4 w-4" />
              {h.inquiry_badge}
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              {h.inquiry_title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-emerald-50 md:text-lg">
              {h.inquiry_subtitle}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-100">
              <Clock className="h-4 w-4" />
              {h.cta_subtitle}
            </p>
          </div>
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-6 md:p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
