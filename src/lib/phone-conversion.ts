import type { MouseEvent } from "react";

import { PHONE_TEL_HREF } from '@/lib/contact-links';

/** Номер для конверсии «звонок» в Google Ads */
export { PHONE_TEL_HREF };

/**
 * Вызов из onClick ссылки «Позвонить»: отправляет conversion и открывает tel: через callback Google.
 */
export function onTelLinkClick(
  e: MouseEvent<HTMLAnchorElement>,
  tel: string = PHONE_TEL_HREF
): void {
  if (typeof window === "undefined") return;
  const w = window as typeof window & {
    gtag_report_conversion?: (url?: string) => boolean;
  };
  if (typeof w.gtag_report_conversion === "function") {
    e.preventDefault();
    w.gtag_report_conversion(tel);
  }
}
