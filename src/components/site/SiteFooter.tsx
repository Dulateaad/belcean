
'use client';
import Link from 'next/link';
import { Logo } from './Logo';
import { Instagram } from 'lucide-react';
import { onTelLinkClick } from '@/lib/phone-conversion';
import { PHONE_DISPLAY, PHONE_TEL_HREF, TELEGRAM_HREF } from '@/lib/contact-links';
import { useDictionary } from '@/contexts/dictionary-context';
import * as constants from '@/lib/constants';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n-config';
import { useEffect, useState } from 'react';

export function SiteFooter() {
  const t = useDictionary();
  const services = constants.getServices(t);
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || i18n.defaultLocale;

  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t bg-secondary">
      <div className="container py-12">
        <div className="grid gap-12 md:gap-8 md:grid-cols-4 text-center md:text-left">
          <div className="space-y-4 md:col-span-2 flex flex-col items-center md:items-start">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-sm">
              {t.Footer.description}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">{t.Footer.services}</h4>
            <ul className="space-y-2">
              {services.map((service: any) => (
                <li key={service.slug}>
                  <Link href={`/${currentLocale}${service.slug}`} className="text-sm text-muted-foreground hover:text-primary hover:underline">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">{t.Footer.contacts}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t.Footer.address}</p>
              <p>
                <a href="mailto:info@beclean.pro" className="hover:text-primary hover:underline">info@beclean.pro</a>
              </p>
              <p>
                <a
                  href={PHONE_TEL_HREF}
                  onClick={(e) => onTelLinkClick(e)}
                  className="hover:text-primary hover:underline font-semibold"
                >
                  {PHONE_DISPLAY}
                </a>
              </p>
               <div className="flex space-x-4 pt-4 justify-center md:justify-start">
                <Link href={TELEGRAM_HREF} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-[#229ED9] hover:opacity-80">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </Link>
                <Link href="https://www.instagram.com/beclean_servic?igsh=OTlpZXg3ODlrZnYw" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground min-h-[20px]">
          {year && <p>{t.Footer.copyright.replace('{year}', String(year))}</p>}
        </div>
      </div>
    </footer>
  );
}
