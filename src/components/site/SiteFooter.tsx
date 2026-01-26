import Link from 'next/link';
import { Logo } from './Logo';
import { services } from '@/lib/constants';
import { Facebook, Instagram, Send } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Профессиональный клининг для вашего бизнеса в Ташкенте.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Telegram">
                <Send className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={service.slug} className="text-sm text-muted-foreground hover:text-primary">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>г. Ташкент, ул. Амира Темура, 1</p>
              <p>
                <a href="mailto:info@beclean.pro" className="hover:text-primary">info@beclean.pro</a>
              </p>
              <p>
                <a href="tel:+998712000000" className="hover:text-primary">+998 71 200 00 00</a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BeClean Pro. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
