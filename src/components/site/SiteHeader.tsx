'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

export function SiteHeader() {
  const t = useDictionary();
  const services = constants.getServices(t);
  const pathname = usePathname();

  const currentLocale = pathname.split('/')[1] || i18n.defaultLocale;

  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const navLinks = [
    { href: `/${currentLocale}/calculator`, label: t.Header.calculator },
    { href: '#contacts', label: t.Header.contacts },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" suppressHydrationWarning>
      <div className="container flex h-20 items-center">
        <div className="mr-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
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

        <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
          <div className="flex items-center gap-2">
             <Clock className="h-5 w-5 text-primary" />
             <span className="font-semibold text-base">{t.Header.work_hours}</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Phone className="h-5 w-5 text-primary" />
            <a
              href="tel:+998773566070"
              className="font-bold text-lg hover:text-primary transition-colors"
            >
              +998 77 356 60 70
            </a>
          </div>
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-[70px]">
                  {currentLocale.toUpperCase()}
                  <ChevronDown className="h-4 w-4 ml-2" />
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
          <Button asChild className="hidden lg:inline-flex">
            <Link href="#cta">{t.Header.call_request}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
