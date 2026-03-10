
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
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE.jpeg?alt=media&token=bd3e0619-26b5-482a-b91d-57d6564e3671",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE1.jpeg?alt=media&token=ae8a72d4-23ef-44e6-b24f-40d07d6ab7d5",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE2.jpeg?alt=media&token=9e855851-2242-4097-803a-61017b971400",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE3.jpeg?alt=media&token=acd24e5b-a797-4181-98b2-b66aed452dfb",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE4%202.jpeg?alt=media&token=20d3a5ec-7c67-48c2-9d88-394b546bb6f8",
  "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%B4%D0%BE5.jpeg?alt=media&token=def6b829-07a3-4a00-8e60-952d6ea7b277"
];

export const getTestimonials = () => [
  {
    name: "Азиз Махмудов",
    role: "Владелец кафе",
    avatar: "https://picsum.photos/seed/aziz/100/100",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%BE%D1%82%D0%B7%D0%B7%D0%B8%D0%B25.jpeg?alt=media&token=f9245ddd-be63-40ea-9ae4-ea7dc08fca10"
  },
  {
    name: "Малика Саидова",
    role: "Частный клиент",
    avatar: "https://picsum.photos/seed/malika/100/100",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%BE%D1%82%D0%B7%D0%B8%D0%B2.jpeg?alt=media&token=44ae9e55-5a1b-43fc-abbe-477e00b2ff41"
  },
  {
    name: "Джахонгир Обидов",
    role: "Менеджер офиса",
    avatar: "https://picsum.photos/seed/jakhon/100/100",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%BE%D1%82%D0%B7%D0%B8%D0%B211.jpeg?alt=media&token=c55789a6-786a-43d6-a140-4c61c4339866"
  },
  {
    name: "Наргиза Каримова",
    role: "Директор клиники",
    avatar: "https://picsum.photos/seed/nargiza/100/100",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%BE%D1%82%D0%B7%D0%B8%D0%B22.jpeg?alt=media&token=d34eab04-ed63-47f0-ad5e-4cbc262bf710"
  },
  {
    name: "Сардор Умаров",
    role: "IT-предприниматель",
    avatar: "https://picsum.photos/seed/sardor/100/100",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%BE%D1%82%D0%B7%D0%B8%D0%B23.jpeg?alt=media&token=641c6b83-6b68-4a13-97c6-8a8a3f6a3e1b"
  },
  {
    name: "Дильдора Касымова",
    role: "Владелица магазина",
    avatar: "https://picsum.photos/seed/dildora/100/100",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%BE%D1%82%D0%B7%D0%B8%D0%B24.jpeg?alt=media&token=7347fc14-8c97-499b-9acb-cc05eb416646"
  },
  {
    name: "Фаррух Ахмедов",
    role: "Управляющий БЦ",
    avatar: "https://picsum.photos/seed/farrukh/100/100",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%BE%D1%82%D0%B7%D0%B8%D0%B25.jpeg?alt=media&token=9c069362-8236-4fe4-a19a-9155c7835b56"
  },
  {
    name: "Гульнора Рахимова",
    role: "Счастливый клиент",
    avatar: "https://picsum.photos/seed/gulnora/100/100",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%BE%D1%82%D0%B7%D0%B8%D0%B26.jpeg?alt=media&token=412f6d12-a4f6-4002-bdda-37a69a589af0"
  },
  {
    name: "Бобур Исхаков",
    role: "Руководитель склада",
    avatar: "https://picsum.photos/seed/bobur/100/100",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%BE%D1%82%D0%B7%D0%B8%D0%B27.jpeg?alt=media&token=321bf542-a13f-445a-87b9-7df5fd48df3a"
  },
  {
    name: "Рано Турсунова",
    role: "HR-менеджер",
    avatar: "https://picsum.photos/seed/rano/100/100",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D0%BE%D1%82%D0%B7%D0%B8%D0%B29.jpeg?alt=media&token=8d031a7a-bbb4-4f30-9c70-5b7c89785050"
  }
];

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
