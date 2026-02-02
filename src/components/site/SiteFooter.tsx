import Link from 'next/link';
import { Logo } from './Logo';
import { services } from '@/lib/constants';
import { Facebook, Instagram, Send } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-secondary/70">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-sm">
              Профессиональный клининг для вашего бизнеса в Ташкенте. Чистота, которой можно доверять.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Услуги</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={service.slug} className="text-sm text-muted-foreground hover:text-primary hover:underline">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Контакты</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>г. Ташкент, ул. Амира Темура, 1</p>
              <p>
                <a href="mailto:info@beclean.pro" className="hover:text-primary hover:underline">info@beclean.pro</a>
              </p>
              <p>
                <a href="tel:+998773566070" className="hover:text-primary hover:underline font-semibold">+998 77 356 60 70</a>
              </p>
               <div className="flex space-x-4 pt-4">
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
                <Link href="https://www.instagram.com/beclean_pro/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
                <Link href="https://t.me/beclean_uz" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <Send className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BeClean Pro. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
