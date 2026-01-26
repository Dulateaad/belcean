import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'BeClean Pro - Профессиональный клининг для бизнеса в Ташкенте',
  description: 'Профессиональные клининговые услуги для офисов, бизнес-центров, клиник и магазинов в Ташкенте. Гарантия качества, договор, обученный персонал.',
  keywords: 'клининг Ташкент, уборка офисов, клининговые услуги, профессиональная уборка, BeClean Pro',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BeClean Pro",
    "image": "https://beclean-pro.example.com/logo.png",
    "url": "https://beclean-pro.example.com",
    "telephone": "+998 71 200 00 00",
    "description": "Профессиональный клининг для бизнеса в Ташкенте. Офисы, БЦ, клиники. Договор. Контроль качества.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Амира Темура, 1",
      "addressLocality": "Ташкент",
      "postalCode": "100000",
      "addressCountry": "UZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.311081,
      "longitude": 69.244072
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": []
  };

  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
