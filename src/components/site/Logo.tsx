import Image from 'next/image';
import { cn } from '@/lib/utils';

import logoSrc from '@/assets/logo.png';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={logoSrc}
        alt="BECLEAN SERVIS"
        width={40}
        height={40}
        className="h-9 w-9 rounded-full object-cover ring-2 ring-white/20"
        priority
      />
      <span
        className={cn(
          'hidden font-headline text-lg font-bold tracking-tight sm:inline',
          light ? 'text-white' : 'text-foreground',
        )}
      >
        BECLEAN
      </span>
    </div>
  );
}
