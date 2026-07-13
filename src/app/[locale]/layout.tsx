
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { getDictionary } from '@/lib/get-dictionary';
import { i18n, type Locale } from '@/i18n-config';
import { DictionaryProvider } from '@/contexts/dictionary-context';
import { AutoLeadPopup } from '@/components/site/AutoLeadPopup';
import { FloatingInquiry } from '@/components/site/FloatingInquiry';
import { QuoteFlowProvider } from '@/components/site/quote-flow';
import { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return {
    title: t.HomePage.meta_title,
    description: t.HomePage.meta_description,
    keywords: t.HomePage.meta_keywords,
    openGraph: {
      title: t.HomePage.meta_title,
      description: t.HomePage.meta_description,
      url: 'https://beclean.uz',
      siteName: 'BECLEAN SERVIS',
      locale: locale === 'uz' ? 'uz_UZ' : 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.HomePage.meta_title,
      description: t.HomePage.meta_description,
    },
    alternates: {
      canonical: `https://beclean.uz/${locale}`,
    },
  };
}

async function getClientIp(): Promise<string> {
  try {
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();
    return headersList.get('x-real-ip') || headersList.get('cf-connecting-ip') || '';
  } catch {
    return '';
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const clientIp = (await getClientIp()).replace(/["\\]/g, '');

  return (
    <html lang={locale}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PHBX7WMP');
          `}
        </Script>
        {/* End Google Tag Manager */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&family=Oswald:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PHBX7WMP"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <DictionaryProvider dictionary={t}>
          <QuoteFlowProvider>
            <div className="animate-fade-in flex flex-col flex-1">
              <SiteHeader />
              <main className="flex-grow">{children}</main>
              <SiteFooter />
            </div>
            <AutoLeadPopup />
            <FloatingInquiry />
          </QuoteFlowProvider>
        </DictionaryProvider>
        <Toaster />

        {/* Global site tag (gtag.js) — Google Analytics + Google Ads */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VT6Q7ZS6JZ" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VT6Q7ZS6JZ');
            gtag('config', 'AW-18083313268');
            gtag('config', 'AW-17765235654');
            window.gtag_report_conversion = function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof url !== 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                send_to: 'AW-18083313268/t5M8CLKH6Z8cEPTs5a5D',
                transaction_id: '',
                event_callback: callback
              });
              return false;
            };
          `}
        </Script>

        {/* Yandex Metrika */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            window.yaParams = { ip_address: "${clientIp}" };
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110144872', 'ym');
            ym(110144872, 'init', {
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
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/110144872" style={{ position: 'absolute', left: -9999 }} alt="" />
          </div>
        </noscript>
        <Script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.11/dist/dotlottie-wc.js" type="module" strategy="lazyOnload" />
      </body>
    </html>
  );
}
