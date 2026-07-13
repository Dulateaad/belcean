'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { useDictionary } from '@/contexts/dictionary-context';
import { onTelLinkClick } from '@/lib/phone-conversion';
import { PHONE_TEL_HREF, TELEGRAM_HREF } from '@/lib/contact-links';
import { cn } from '@/lib/utils';

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const iconBtn =
  'flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-95 hover:brightness-110 sm:h-14 sm:w-14';

function ContactIcon({
  href,
  label,
  onClick,
  className,
  glowClass,
  children,
}: {
  href: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className: string;
  glowClass?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      title={label}
      className={cn(iconBtn, 'contact-widget-glow contact-widget-float', glowClass, className)}
    >
      {children}
    </a>
  );
}

export function FloatingInquiry() {
  const t = useDictionary();
  const tFloating = t.FloatingInquiry;
  const [bottomOffset, setBottomOffset] = useState('1rem');

  useEffect(() => {
    const updateOffset = () => {
      const vv = window.visualViewport;
      if (!vv) {
        setBottomOffset('max(1rem, env(safe-area-inset-bottom, 0px))');
        return;
      }
      const chromeGap = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      const extra = chromeGap > 8 ? chromeGap + 8 : 0;
      setBottomOffset(`calc(1rem + env(safe-area-inset-bottom, 0px) + ${extra}px)`);
    };

    updateOffset();
    window.visualViewport?.addEventListener('resize', updateOffset);
    window.visualViewport?.addEventListener('scroll', updateOffset);
    window.addEventListener('resize', updateOffset);
    return () => {
      window.visualViewport?.removeEventListener('resize', updateOffset);
      window.visualViewport?.removeEventListener('scroll', updateOffset);
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  return (
    <div
      className="fixed right-3 z-50 flex flex-col gap-2.5 sm:right-4 sm:gap-3"
      style={{ bottom: bottomOffset }}
    >
      <ContactIcon
        href={TELEGRAM_HREF}
        label={tFloating.telegram}
        className="bg-[#229ED9]"
        glowClass="[--widget-glow:rgba(34,158,217,0.55)]"
      >
        <TelegramIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </ContactIcon>
      <ContactIcon
        href={PHONE_TEL_HREF}
        label={tFloating.call}
        onClick={(e) => onTelLinkClick(e)}
        className="bg-emerald-600 contact-widget-float-delay"
        glowClass="[--widget-glow:rgba(16,185,129,0.55)]"
      >
        <Phone className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.25} />
      </ContactIcon>
    </div>
  );
}
