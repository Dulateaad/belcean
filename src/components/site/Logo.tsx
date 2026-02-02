import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/photo_5190879925169230470_x.jpg?alt=media&token=e507f7fa-f14d-4990-8a89-1cb85f219ff8"
        alt="BeClean Pro Logo"
        width={140}
        height={40}
        className="w-auto"
        style={{ height: 25 }}
        priority
      />
    </div>
  );
}
