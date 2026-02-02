'use client';
import Link from 'next/link';
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
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, ChevronDown, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { services } from '@/lib/constants';

export function SiteHeader() {
  const navLinks = [
    { href: '/calculator', label: 'Калькулятор' },
    { href: '#contacts', label: 'Контакты' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        {/* Left-aligned content */}
        <div className="flex items-center gap-6 mr-auto">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden items-center space-x-6 text-base font-medium md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center outline-none hover:text-primary transition-colors">
                Услуги <ChevronDown className="h-4 w-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {services.map((service) => (
                  <DropdownMenuItem key={service.slug} asChild>
                    <Link href={service.slug}>{service.title}</Link>
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

        {/* Right-aligned content */}
        <div className="flex items-center space-x-4">
          <div className="hidden items-center gap-2 sm:flex">
            <Phone className="h-5 w-5 text-primary" />
            <a
              href="tel:+998773566070"
              className="font-bold text-lg hover:text-primary transition-colors"
            >
              +998 77 356 60 70
            </a>
          </div>
          <Button asChild className="hidden md:inline-flex">
            <Link href="#cta">Заказать звонок</Link>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="sr-only">Меню</SheetTitle>
                  <SheetDescription className="sr-only">
                    Главная навигация сайта
                  </SheetDescription>
                </SheetHeader>
                <Link href="/" className="mb-8 block">
                  <Logo />
                </Link>
                <div className="flex flex-col space-y-4">
                  <h4 className="font-semibold text-lg">Услуги</h4>
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={service.slug}
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
        </div>
      </div>
    </header>
  );
}
