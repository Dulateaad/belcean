import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ThankYouPage() {
  const thankYouImage = PlaceHolderImages.find(p => p.id === 'thank-you');

  return (
    <div className="container flex-grow flex items-center justify-center py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center max-w-4xl mx-auto">
        <div className="text-center md:text-left">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto md:mx-0 mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            Спасибо за вашу заявку!
          </h1>
          <p className="text-muted-foreground mb-6">
            Наш менеджер скоро свяжется с вами для уточнения деталей. Мы ценим ваш интерес к BeClean Pro.
          </p>
          <Button asChild>
            <Link href="/">Вернуться на главную</Link>
          </Button>
        </div>
        <div>
          {thankYouImage && (
            <Image
              alt="Thank you"
              className="rounded-lg object-cover w-full aspect-video"
              height="310"
              src={thankYouImage.imageUrl}
              width="550"
              data-ai-hint={thankYouImage.imageHint}
            />
          )}
        </div>
      </div>
    </div>
  );
}
