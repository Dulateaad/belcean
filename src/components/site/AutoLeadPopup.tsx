'use client';

import { useEffect } from 'react';
import { useQuoteFlow } from '@/components/site/quote-flow';

const DELAY_MS = 90_000;
const STORAGE_KEY = 'beclean-auto-lead-shown';
const SUBMITTED_KEY = 'beclean-inquiry-submitted';

export function AutoLeadPopup() {
  const { openForm } = useQuoteFlow();

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(SUBMITTED_KEY)) {
      return;
    }

    const id = window.setTimeout(() => {
      if (sessionStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(SUBMITTED_KEY)) {
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, '1');
      openForm();
    }, DELAY_MS);

    return () => window.clearTimeout(id);
  }, [openForm]);

  return null;
}
