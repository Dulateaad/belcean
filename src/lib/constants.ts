import { Building2, ShoppingBag, HeartPulse, HardHat, Sparkles, Wind, Sofa, Users, UserCheck, ShieldCheck, Smile, ClipboardList, Home, Trophy, Zap, Wallet, Layers } from 'lucide-react';

export const getServices = (t: any) => {
    const servicesText = t.Constants.services;
    const icons = [Sparkles, HardHat, Wind, Building2, Sofa, Layers, Building2, Users, ClipboardList];
    const meta = [
      { imageId: 'service-general', imageHint: 'general cleaning' },
      { imageId: 'service-construction', imageHint: 'construction site' },
      { imageId: 'service-wet', imageHint: 'wet cleaning' },
      { imageId: 'service-office', imageHint: 'clean office' },
      { imageId: 'service-furniture', imageHint: 'upholstery cleaning' },
      { imageId: 'service-furniture', imageHint: 'carpet cleaning' },
      { imageId: 'service-windows', imageHint: 'window cleaning' },
      { imageId: 'service-moving', imageHint: 'moving help' },
      { imageId: 'service-subscription', imageHint: 'calendar schedule' },
    ];
    return servicesText.map((service: { slug: string; title: string; description: string }, index: number) => ({
      slug: service.slug,
      title: service.title,
      description: service.description,
      icon: icons[index] ?? Sparkles,
      imageId: meta[index]?.imageId,
      imageHint: meta[index]?.imageHint,
    }));
};

export const getBeforeAfterImages = (t: any) => {
  const alts = (t.HomePage.gallery_alts ?? []) as string[];
  const urls = [
    "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D1%80%D1%812.jpeg?alt=media&token=35a43fc5-4368-4d9a-bcfe-62a0660e62db",
    "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D1%80%D1%813.jpeg?alt=media&token=52197896-f1ab-4875-9ec8-0f66191b6d1b",
    "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D1%80%D1%814.jpeg?alt=media&token=69409202-c660-4e26-a381-4a1dfcb8ce55",
    "https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/%D1%80%D1%815.jpeg?alt=media&token=4b1328bd-5f21-457b-bc1f-56214905e379",
  ];
  return urls.map((src, i) => ({
    src,
    alt: alts[i] ?? `Результат уборки BECLEAN SERVIS — фото ${i + 1}`,
  }));
};

export const getClientTypes = (t: any) => {
    const clientTypesText = t.Constants.client_types;
    return [
        { name: clientTypesText[0].name, icon: Building2 },
        { name: clientTypesText[1].name, icon: Building2 },
        { name: clientTypesText[2].name, icon: ShoppingBag },
        { name: clientTypesText[3].name, icon: HeartPulse },
        { name: clientTypesText[4].name, icon: HardHat },
        { name: clientTypesText[5].name, icon: Home },
    ];
};

export const getPrices = (t: any) => {
    return t.Constants.prices;
};

/** Аватары по полу из словаря (`gender`: female/male); разные лица — хэш от имени */
const AVATAR_FEMALE = [
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
    'https://randomuser.me/api/portraits/women/17.jpg',
    'https://randomuser.me/api/portraits/women/33.jpg',
];
const AVATAR_MALE = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/men/75.jpg',
    'https://randomuser.me/api/portraits/men/52.jpg',
    'https://randomuser.me/api/portraits/men/86.jpg',
    'https://randomuser.me/api/portraits/men/41.jpg',
];

export const getTestimonials = (t: any) => {
    const testimonials = t.HomePage.testimonials;
    return testimonials.map((item: any, index: number) => {
        if (item.business === true) {
            return {
                name: item.name,
                role: item.role,
                quote: item.quote,
                date: item.date,
                avatarUrl: '',
                isBusiness: true,
            };
        }

        const override = typeof item.avatarUrl === 'string' && item.avatarUrl.trim().length > 0 ? item.avatarUrl.trim() : null;
        const g = String(item.gender ?? '').toLowerCase();
        const useFemale =
            g === 'female' || g === 'f'
                ? true
                : g === 'male' || g === 'm'
                  ? false
                  : index % 2 === 0;

        const pool = useFemale ? AVATAR_FEMALE : AVATAR_MALE;
        const hash = (item.name ?? '').split('').reduce((acc: number, ch: string) => acc + ch.charCodeAt(0), index);
        const avatarUrl = override ?? pool[Math.abs(hash) % pool.length];

        return {
            name: item.name,
            role: item.role,
            quote: item.quote,
            date: item.date,
            avatarUrl,
            isBusiness: false,
        };
    });
};
