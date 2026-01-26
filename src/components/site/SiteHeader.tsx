'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { services } from '@/lib/constants';

export function SiteHeader() {
  const navLinks = [
    { href: '/calculator', label: 'Калькулятор' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center outline-none">
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
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Mobile navigation menu
              </SheetDescription>
            </SheetHeader>
            <Link href="/" className="mb-8 block">
              <Logo />
            </Link>
            <div className="flex flex-col space-y-4">
              <h4 className="font-semibold">Услуги</h4>
              {services.map((service) => (
                <Link key={service.slug} href={service.slug} className="text-muted-foreground hover:text-foreground">
                  {service.title}
                </Link>
              ))}
              <hr/>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between md:justify-end space-x-2">
          <Link href="/" className="md:hidden">
            <Logo />
          </Link>
          <Button asChild>
            <a href="tel:+998712000000">Позвонить</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
