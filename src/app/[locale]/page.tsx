import { Card, CardContent } from '@/components/ui/card';
import { ReviewsCarousel } from '@/components/site/ReviewsCarousel';
import {
  CheckCircle2,
  Handshake,
  MessageCircle,
  Wrench,
  BadgeCheck,
  Users,
} from 'lucide-react';
import * as constants from '@/lib/constants';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import {
  RollingStatsSection,
  type RollingStatItem,
  type StatSuffix,
} from '@/components/site/RollingStatsSection';
import { HomeHeroFairPrice } from '@/components/site/HomeHeroFairPrice';
import { HomeInquirySection } from '@/components/site/HomeInquirySection';
import { HomeUspSection } from '@/components/site/HomeUspSection';
import { HomeFaqSection } from '@/components/site/HomeFaqSection';
import { HomeServicesSection } from '@/components/site/HomeServicesSection';

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getDictionary(locale);
  const clientTypes = constants.getClientTypes(t);
  const testimonials = constants.getTestimonials(t);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div id="hero">
        <HomeHeroFairPrice />
      </div>

      <HomeUspSection />

      <HomeInquirySection />

      <RollingStatsSection
        variant="rows"
        backgroundImageSrc="/stats-trust-bg.png"
        statsHeader={{
          badge: t.HomePage.stats_header_badge,
          line1: t.HomePage.stats_headline_1,
          line2Accent: t.HomePage.stats_headline_2,
        }}
        ariaLabel={t.HomePage.stats_aria}
        items={(t.HomePage.stats_items as { value: number; label: string; label_line2?: string; suffix: string; isRating?: boolean }[]).map(
          (item, i): RollingStatItem => ({
            value: item.value,
            label: item.label,
            label_line2: item.label_line2,
            delayBase: i * 250,
            suffix: (item.suffix === 'star' || item.suffix === 'none' || item.suffix === 'plus'
              ? item.suffix
              : 'plus') as StatSuffix,
            isRating: Boolean(item.isRating),
          })
        )}
      />

      <section id="clients" className="w-full py-16 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline flex items-center justify-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-primary" /> {t.HomePage.clients_title}
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
              {t.HomePage.clients_subtitle}
            </p>
          </div>
          <div className="mx-auto grid grid-cols-2 items-start gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-12 text-center">
            {clientTypes.map((client: any, index: number) => {
              const ClientIcon = client.icon;
              return (
              <div key={index} className="flex flex-col items-center gap-4 text-center transition-transform duration-300 hover:scale-105">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <ClientIcon className="h-12 w-12 text-primary" strokeWidth={1.5} aria-hidden />
                </div>
                <p className="text-lg font-semibold">{client.name}</p>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      <HomeServicesSection />

      <section id="trust-us" className="w-full py-16 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline flex items-center justify-center gap-3">
              <Handshake className="w-8 h-8 text-primary" /> {t.HomePage.trust_us_title}
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
              {t.HomePage.trust_us_subtitle}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {(t.HomePage.trust_us_items as string[]).map((item: string, index: number) => (
              <div
                key={index}
                className="px-6 py-3 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trust-pillars" className="w-full py-16 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              {t.HomePage.trust_pillars_title}
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              {t.HomePage.trust_pillars_subtitle}
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {(t.HomePage.trust_pillars as { title: string; description: string }[]).map((item, index) => {
              const icons = [Wrench, BadgeCheck, Users];
              const Icon = icons[index] ?? Wrench;
              return (
                <Card key={item.title} className="border bg-background/95 shadow-sm hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 md:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start md:flex-col">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-lg leading-snug">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <HomeFaqSection />

      <section id="reviews" className="w-full py-16 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline flex items-center justify-center gap-3">
              <MessageCircle className="w-8 h-8 text-primary" /> {t.HomePage.reviews_title}
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
              {t.HomePage.reviews_subtitle}
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <ReviewsCarousel
              testimonials={testimonials}
              clientLabel={t.HomePage.reviews_client_label}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
