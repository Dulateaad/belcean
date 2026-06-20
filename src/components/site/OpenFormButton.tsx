'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export function OpenFormButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const params = useParams();
  const locale = (params.locale as string) || 'ru';

  return (
    <Link
      href={`/${locale}/calculator`}
      className={cn(
        'inline-flex items-center font-semibold text-primary opacity-70 transition-opacity hover:opacity-100',
        className,
      )}
    >
      {children}
    </Link>
  );
}
