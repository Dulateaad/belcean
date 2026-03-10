
import { Building2, ShoppingBag, HeartPulse, HardHat, Sparkles, Wind, Sofa, Users, UserCheck, ShieldCheck, Smile, ClipboardList, Home, Trophy, Zap, Wallet } from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

export const getServices = (t: any) => {
    const servicesText = t.Constants.services;
    return [
      { slug: servicesText[0].slug, title: servicesText[0].title, description: servicesText[0].description, icon: Building2, imageId: 'service-office', imageHint: 'clean office' },
      { slug: servicesText[1].slug, title: servicesText[1].title, description: servicesText[1].description, icon: ClipboardList, imageId: 'service-subscription', imageHint: 'calendar schedule' },
      { slug: servicesText[2].slug, title: servicesText[2].title, description: servicesText[2].description, icon: Sparkles, imageId: 'service-general', imageHint: 'floor polishing' },
      { slug: servicesText[3].slug, title: servicesText[3].title, description: servicesText[3].description, icon: HardHat, imageId: 'service-construction', imageHint: 'construction site' },
      { slug: servicesText[4].slug, title: servicesText[4].title, description: servicesText[4].description, icon: Wind, imageId: 'service-windows', imageHint: 'window cleaning' },
      { slug: servicesText[5].slug, title: servicesText[5].title, description: servicesText[5].description, icon: Sofa, imageId: 'service-furniture', imageHint: 'upholstery cleaning' },
    ];
};

export const getBeforeAfterImages = () => [
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE%D1%811.jpeg?alt=media&token=450f4df5-1c8a-44ac-ab77-7ef5dff6b1b0",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE%D1%812.jpeg?alt=media&token=522ea615-2007-4457-88e4-134c810fcb31",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE%D1%813.jpeg?alt=media&token=a0a733d8-f1c9-4904-ad99-e832053d8217",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE%D1%814.jpeg?alt=media&token=7503d117-f36c-4260-9352-56f3b2ea11f0",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE%D1%815.jpeg?alt=media&token=06b6a2bc-8f13-478b-989e-95d924c7c47d",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE%D1%816.jpeg?alt=media&token=36922884-fce9-473b-8f80-66fac31f5cc1",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE.jpeg?alt=media&token=bd3e0619-26b5-482a-b91d-57d6564e3671",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE1.jpeg?alt=media&token=ae8a72d4-23ef-44e6-b24f-40d07d6ab7d5",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE2.jpeg?alt=media&token=9e855851-2242-4097-803a-61017b971400",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE3.jpeg?alt=media&token=acd24e5b-a797-4181-98b2-b66aed452dfb",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE4%202.jpeg?alt=media&token=20d3a5ec-7c67-48c2-9d88-394b546bb6f8",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE5.jpeg?alt=media&token=def6b829-07a3-4a00-8e60-952d6ea7b277"
];

export const getTestimonials = (t: any) => {
  const testimonialsText = t.Constants.testimonials;
  const avatarSeeds = [
    'alisher', 'elena', 'timur', 'malika', 'rustam', 'lola', 'sanzhar', 'dildora', 'bakhtiyor', 'aziza'
  ];
  
  return testimonialsText.map((item: any, index: number) => ({
    ...item,
    avatar: `https://picsum.photos/seed/${avatarSeeds[index]}/100/100`
  }));
};

export const getClientTypes = (t: any) => {
    const clientTypesText = t.Constants.client_types;
    return [
        { name: clientTypesText[0].name, icon: Building2, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/Gemini_Generated_Image_o234dto234dto234.png?alt=media&token=7e30c5a4-791a-4b2c-9e99-5d3cf59e0cfd' },
        { name: clientTypesText[1].name, icon: Building2, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/Gemini_Generated_Image_wqlim4wqlim4wqli.png?alt=media&token=2836cd0c-fba1-48f7-a840-12156db46e68' },
        { name: clientTypesText[2].name, icon: ShoppingBag, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/Gemini_Generated_Image_mrb58smrb58smrb5.png?alt=media&token=6784452a-b066-405a-971b-1606c7de2cb2' },
        { name: clientTypesText[3].name, icon: HeartPulse, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/Gemini_Generated_Image_x21e9gx21e9gx21e.png?alt=media&token=cdd15f92-cbe6-4fc5-b9bd-e63e37439429' },
        { name: clientTypesText[4].name, icon: HardHat, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/Gemini_Generated_Image_8ha5h68ha5h68ha5.png?alt=media&token=cdfe0667-95c2-40cb-adf6-00e5911e906d' },
        { name: clientTypesText[5].name, icon: Home, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/Gemini_Generated_Image_so9mwwso9mwwso9m.png?alt=media&token=6c739362-5949-4dd0-86de-2bb1cc257e22' },
    ];
};

export const getWhyBeClean = (t: any) => {
    const whyBeCleanText = t.Constants.why_beclean;
    const icons = [Trophy, Zap, Wallet, Users, ShieldCheck, UserCheck];
    return whyBeCleanText.map((item: any, index: number) => ({
        ...item,
        icon: icons[index] || ShieldCheck
    }));
};

export const getHowItWorks = (t: any) => {
    return t.Constants.how_it_works;
};

export const getPrices = (t: any) => {
    return t.Constants.prices;
};
