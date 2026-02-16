import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { DictionaryProvider } from '@/contexts/dictionary-context';
import { FloatingInquiry } from '@/components/site/FloatingInquiry';
import { headers } from 'next/headers';

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
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for');

  const yandexMetrikaScript = `
    window.yaParams = { ip_address: "${ip || ''}" };

    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106653042', 'ym');

    ym(106653042, 'init', {
        ssr:true,
        webvisor:true,
        clickmap:true,
        ecommerce:"dataLayer",
        referrer: document.referrer,
        url: location.href,
        accurateTrackBounce:true,
        trackLinks:true,
        params: window.yaParams
    });
  `;

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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K3RV87GB');
            `,
          }}
        />
        {/* End Google Tag Manager */}
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
        {/* Yandex.Metrika counter */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: yandexMetrikaScript }}
        />
        {/* End Yandex.Metrika counter */}
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K3RV87GB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* Yandex.Metrika counter (noscript) */}
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106653042"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
        {/* /Yandex.Metrika counter */}
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
