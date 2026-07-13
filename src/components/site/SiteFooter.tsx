
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
    <footer className="w-full border-t border-white/10 bg-slate-950 text-white">
      <div className="container py-12">
        <div className="grid gap-12 text-center md:grid-cols-4 md:gap-8 md:text-left">
          <div className="flex flex-col items-center space-y-4 md:col-span-2 md:items-start">
            <Logo light />
            <p className="max-w-sm text-sm leading-relaxed text-white/75">
              {t.Footer.description}
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">{t.Footer.services}</h4>
            <ul className="space-y-2">
              {services.map((service: any) => (
                <li key={service.slug}>
                  <Link
                    href={`/${currentLocale}${service.slug}`}
                    className="text-sm text-white/70 transition-colors hover:text-primary hover:underline"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">{t.Footer.contacts}</h4>
            <div className="space-y-2 text-sm text-white/75">
              <p>{t.Footer.address}</p>
              <p>
                <a href="mailto:info@beclean.pro" className="transition-colors hover:text-primary hover:underline">
                  info@beclean.pro
                </a>
              </p>
              <p>
                <a
                  href={PHONE_TEL_HREF}
                  onClick={(e) => onTelLinkClick(e)}
                  className="font-semibold text-white transition-colors hover:text-primary hover:underline"
                >
                  {PHONE_DISPLAY}
                </a>
              </p>
              <div className="flex justify-center space-x-4 pt-4 md:justify-start">
                <Link
                  href={TELEGRAM_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="text-[#229ED9] transition-opacity hover:opacity-80"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/beclean.servis"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/70 transition-colors hover:text-primary"
                >
                  <Instagram className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 min-h-[20px] border-t border-white/10 pt-8 text-center text-sm text-white/60">
          {year && <p>{t.Footer.copyright.replace('{year}', String(year))}</p>}
        </div>
      </div>
    </footer>
  );
}
