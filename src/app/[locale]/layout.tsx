import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { DictionaryProvider } from '@/contexts/dictionary-context';
import { FloatingInquiry } from '@/components/site/FloatingInquiry';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getDictionary(locale);
  return {
    title: t.HomePage.meta_title,
    description: t.HomePage.meta_description,
    keywords: t.HomePage.meta_keywords,
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const t = await getDictionary(locale);

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BECLEAN SERVIS",
    "image": "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/photo_5190879925169230470_x.jpg?alt=media&token=e507f7fa-f14d-4990-8a89-1cb85f219ff8",
    "url": "https://becleanservis.example.com",
    "telephone": "+998773566070",
    "description": "Профессиональный клининг для бизнеса в Ташкенте. Офисы, БЦ, клиники. Договор. Контроль качества.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Yonariq mahallasi, Birdamlik ko'chasi, 283-uy",
      "addressCountry": "UZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.311081,
      "longitude": 69.244072
    },
    "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
    ],
    "sameAs": [
        "https://www.instagram.com/beclean_pro?igsh=OTlpZXg3ODlrZnYw",
        "https://t.me/beclean_manager"
    ]
  };

  return (
    <html lang={locale}>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VT6Q7ZS6JZ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-VT6Q7ZS6JZ');
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.11/dist/dotlottie-wc.js" type="module" async></script>
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background">
        <DictionaryProvider dictionary={t}>
          <div className="animate-fade-in flex flex-col flex-1">
            <SiteHeader />
            <main className="flex-grow">{children}</main>
            <SiteFooter />
          </div>
          <FloatingInquiry />
        </DictionaryProvider>
        <Toaster />
      </body>
    </html>
  );
}
