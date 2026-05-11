'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, ChevronDown, Phone, Clock } from 'lucide-react';
import { Logo } from './Logo';
import { useDictionary } from '@/contexts/dictionary-context';
import * as constants from '@/lib/constants';
import { i18n } from '@/i18n-config';
import { onTelLinkClick, PHONE_TEL_HREF } from '@/lib/phone-conversion';
import { useQuoteFlow } from '@/components/site/quote-flow';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const t = useDictionary();
  const { openQuote } = useQuoteFlow();
  const [phoneReveal, setPhoneReveal] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setPhoneReveal(true), 450);
    return () => window.clearTimeout(id);
  }, []);
  const services = constants.getServices(t);
  const pathname = usePathname();

  const currentLocale = pathname?.split('/')[1] || i18n.defaultLocale;

  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const navLinks = [
    { href: `/${currentLocale}#contacts`, label: t.Header.contacts },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" suppressHydrationWarning>
      <div className="container flex h-20 items-center justify-between">
        <div className="flex flex-1 items-center justify-start md:flex-initial">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Меню навигации</SheetTitle>
                  </SheetHeader>
                  <Link href={`/${currentLocale}`} className="mb-8 block">
                    <Logo />
                  </Link>
                  <div className="flex flex-col space-y-4">
                      <h4 className="font-semibold text-lg">{t.Header.services}</h4>
                      {services.map((service: any) => (
                        <Link
                          key={service.slug}
                          href={`/${currentLocale}${service.slug}`}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {service.title}
                        </Link>
                      ))}
                      <hr />
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="font-semibold text-lg"
                        >
                          {link.label}
                        </Link>
                      ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            <Link href={`/${currentLocale}`} className="hidden md:flex mr-6">
                <Logo />
            </Link>
        </div>

        <div className="flex flex-1 items-center justify-center md:flex-initial">
             <div
               className={cn(
                 'md:hidden flex flex-col items-center pr-4 transition-all duration-700 ease-out motion-reduce:transition-none',
                 phoneReveal ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
               )}
             >
                <a
                  href={PHONE_TEL_HREF}
                  onClick={(e) => onTelLinkClick(e)}
                  className="flex items-center gap-1 font-bold text-lg sm:text-xl hover:text-primary transition-colors leading-none"
                >
                    <Phone className="h-4 w-4 text-emerald-600" />
                    <span className="whitespace-nowrap">77 356-60-70</span>
                </a>
                <div className="flex items-center gap-1 mt-0.5 opacity-80">
                    <Clock className="h-3 w-3 text-emerald-600" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{t.Header.work_hours}</span>
                </div>
             </div>

             <nav className="hidden items-center space-x-6 text-base font-medium md:flex">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center outline-none hover:text-primary transition-colors">
                  {t.Header.services} <ChevronDown className="h-4 w-4 ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {services.map((service: any) => (
                    <DropdownMenuItem key={service.slug} asChild>
                      <Link href={`/${currentLocale}${service.slug}`}>{service.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
        </div>

        <div className="flex flex-1 items-center justify-end md:flex-initial">
            <div className="flex items-center gap-x-2 sm:gap-x-4">
                <div
                  className={cn(
                    'hidden md:flex items-center gap-4 transition-all duration-700 ease-out motion-reduce:transition-none',
                    phoneReveal ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                  )}
                >
                    <a
                      href={PHONE_TEL_HREF}
                      onClick={(e) => onTelLinkClick(e)}
                      className="flex items-center gap-1 font-bold text-xl hover:text-emerald-600 transition-colors"
                    >
                        <Phone className="h-5 w-5 text-emerald-600" />
                        <span>77 356-60-70</span>
                    </a>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden md:flex items-center gap-1">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        <span className="font-semibold text-xs sm:text-sm">{t.Header.work_hours}</span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="w-[60px] h-7 text-xs sm:w-[70px]">
                            {currentLocale.toUpperCase()}
                            <ChevronDown className="h-4 w-4 ml-1 sm:ml-2" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        {i18n.locales.map(locale => (
                            <DropdownMenuItem key={locale} asChild>
                                <Link href={redirectedPathName(locale)}>{locale.toUpperCase()}</Link>
                            </DropdownMenuItem>
                        ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Button
                  type="button"
                  className="hidden lg:inline-flex ml-4 bg-emerald-600 hover:bg-emerald-700"
                  onClick={openQuote}
                >
                  {t.Header.call_request}
                </Button>
            </div>
        </div>
      </div>
    </header>
  );
}
