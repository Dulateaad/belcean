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
import { PHONE_DISPLAY } from '@/lib/contact-links';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const t = useDictionary();
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

  const isHome =
    pathname === `/${currentLocale}` ||
    pathname === `/${currentLocale}/` ||
    pathname === '/' ||
    pathname === '';

  return (
    <header
      className={cn(
        'z-50 w-full',
        isHome
          ? 'absolute border-b border-white/10 bg-slate-950/30 backdrop-blur-md'
          : 'sticky top-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      )}
      suppressHydrationWarning
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex flex-1 items-center justify-start gap-2 md:flex-initial">
            <div className="md:hidden shrink-0">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(isHome && 'text-white hover:bg-white/10 hover:text-white')}
                  >
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

            <Link href={`/${currentLocale}`} className="shrink-0 md:mr-6">
                <Logo light={isHome} />
            </Link>
        </div>

        <div className="flex flex-1 items-center justify-center md:flex-initial">
             <a
               href={PHONE_TEL_HREF}
               onClick={(e) => onTelLinkClick(e)}
               aria-label={`${t.FloatingInquiry.call} ${PHONE_DISPLAY}`}
               className={cn(
                 'md:hidden flex flex-col items-center rounded-lg px-3 py-1.5 shadow-sm transition-all duration-700 ease-out motion-reduce:transition-none cursor-pointer active:opacity-90',
                 isHome
                   ? 'border border-white/25 bg-white/10'
                   : 'border border-border/70 bg-background/90',
                 phoneReveal ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
               )}
             >
                <span
                  className={cn(
                    'flex items-center gap-1.5 text-base font-semibold leading-none',
                    isHome ? 'text-white' : 'text-foreground',
                  )}
                >
                    <Phone className={cn('h-3.5 w-3.5 shrink-0', isHome ? 'text-primary' : 'text-muted-foreground')} aria-hidden />
                    <span className="whitespace-nowrap tabular-nums">77 356-60-70</span>
                </span>
                <span className={cn('mt-0.5 flex items-center gap-1', isHome ? 'text-white/75' : 'text-muted-foreground')}>
                    <Clock className="h-3 w-3 shrink-0" aria-hidden />
                    <span className="text-[11px] font-medium uppercase tracking-wide">
                      {t.Header.work_hours}
                    </span>
                </span>
             </a>

             <nav className={cn('hidden items-center space-x-6 text-base font-medium md:flex', isHome && 'text-white')}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    'flex items-center outline-none transition-colors',
                    isHome ? 'hover:text-primary' : 'hover:text-primary',
                  )}
                >
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
                <a
                  href={PHONE_TEL_HREF}
                  onClick={(e) => onTelLinkClick(e)}
                  aria-label={`${t.FloatingInquiry.call} ${PHONE_DISPLAY}`}
                  className={cn(
                    'hidden md:flex flex-col items-end gap-0.5 transition-all duration-700 ease-out motion-reduce:transition-none cursor-pointer rounded-lg px-1 py-0.5',
                    isHome ? 'hover:bg-white/10' : 'hover:bg-muted/50',
                    phoneReveal ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                  )}
                >
                    <span
                      className={cn(
                        'flex items-center gap-1 font-bold text-xl transition-colors',
                        isHome ? 'text-white hover:text-primary' : 'hover:text-emerald-600',
                      )}
                    >
                        <Phone className={cn('h-5 w-5 shrink-0', isHome ? 'text-primary' : 'text-emerald-600')} aria-hidden />
                        <span className="tabular-nums">77 356-60-70</span>
                    </span>
                    <span className={cn('flex items-center gap-1', isHome ? 'text-primary' : 'text-emerald-700/90')}>
                        <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        <span className="text-xs font-bold uppercase tracking-wide">{t.Header.work_hours}</span>
                    </span>
                </a>

                <div className="flex items-center gap-2 sm:gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            'h-7 w-[60px] text-xs sm:w-[70px]',
                            isHome && 'border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white',
                          )}
                        >
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
                  className={cn(
                    'ml-4 hidden lg:inline-flex',
                    isHome ? 'bg-primary text-slate-950 hover:bg-primary/90' : 'bg-emerald-600 hover:bg-emerald-700',
                  )}
                  asChild
                >
                  <a href={PHONE_TEL_HREF} onClick={(e) => onTelLinkClick(e)}>
                    {PHONE_DISPLAY}
                  </a>
                </Button>
            </div>
        </div>
      </div>
    </header>
  );
}
