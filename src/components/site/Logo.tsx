import Image from 'next/image';

import logoSrc from '@/assets/logo.png';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={logoSrc}
        alt="BECLEAN SERVIS"
        width={40}
        height={40}
        className="h-9 w-9 rounded-full object-cover"
        priority
      />
      <span className="hidden font-headline text-lg font-bold tracking-tight text-foreground sm:inline">
        BECLEAN
      </span>
    </div>
  );
}
