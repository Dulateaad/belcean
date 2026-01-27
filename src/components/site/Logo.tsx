import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B1%D0%BA%D0%BB%D0%B8%D0%BD.png?alt=media&token=21a7a612-4e35-4e28-83a1-941c55bc3457"
        alt="BeClean Pro Logo"
        width={140}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </div>
  );
}
