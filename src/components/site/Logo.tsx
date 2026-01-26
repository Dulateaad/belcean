import { Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Sparkles className="h-7 w-7 text-primary" />
      <span className="font-bold text-xl tracking-tighter">BeClean Pro</span>
    </div>
  );
}
