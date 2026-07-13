import { HERO_BANNER_IMAGE } from '@/lib/hero-image';

export type ServiceCardImage = {
  src: string;
  /** Скрыть водяной знак снизу — обрезка через object-position */
  cropBottom?: boolean;
};

const IMG = {
  team: HERO_BANNER_IMAGE,
  afterRepair:
    'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_fkfn89fkfn89fkfn.png?alt=media&token=d0c87cac-6f1f-4e23-b16f-7a095ad69e41',
  wet:
    'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_u1o89xu1o89xu1o8.png?alt=media&token=44489fa3-4347-45cf-8b39-f91f5fe9642e',
  office:
    'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_cz8v6ocz8v6ocz8v.png?alt=media&token=e459b048-1b5d-4d9a-a9a4-b8d5d7ae0fb2',
  furniture:
    'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_795fno795fno795f.png?alt=media&token=195be34a-df57-4ae5-8c3e-c76e7457f177',
  carpet:
    'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_jdfh19jdfh19jdfh.png?alt=media&token=2fdee295-602b-4cd6-b408-61c26fc1a852',
  windows:
    'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_5vak5o5vak5o5vak.png?alt=media&token=0c906ff9-d4c2-441c-829b-88b4732d51c4',
  moving:
    'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_v6nqmkv6nqmkv6nq.png?alt=media&token=c05429d3-1784-4a70-9d42-11ee256d207c',
  work:
    'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_wxscbawxscbawxsc.png?alt=media&token=42514903-3c20-497a-9a03-a2114cf0c87e',
} as const;

/** Ключи картинок для карточек услуг (разные фото на услугу) */
export const SERVICE_CARD_IMAGES: Record<string, ServiceCardImage> = {
  '/generalnaya-uborka': { src: IMG.team, cropBottom: true },
  '/poslestroitelnaya-uborka': { src: IMG.afterRepair },
  '/vlazhnaya-uborka': { src: IMG.wet },
  '/uborka-ofisov-tashkent': { src: IMG.office },
  '/himchistka-mebeli': { src: IMG.furniture },
  '/chistka-kover': { src: IMG.carpet },
  '/moika-okon': { src: IMG.windows },
  '/pomosh-pri-pereezde': { src: IMG.moving },
  '/abonentskiy-klining': { src: IMG.work },
  // отдельные ключи, когда slug общий, но фото должно отличаться
  facade: { src: IMG.windows },
  storefront: { src: IMG.work },
  'office-general': { src: IMG.office },
  movers: { src: IMG.moving },
  trash: { src: IMG.afterRepair },
};

export const WORK_ALGORITHM_IMAGE = IMG.work;

export const HOMEPAGE_SERVICE_SLUGS = [
  '/generalnaya-uborka',
  '/poslestroitelnaya-uborka',
  '/vlazhnaya-uborka',
  '/uborka-ofisov-tashkent',
  '/himchistka-mebeli',
  '/chistka-kover',
  '/moika-okon',
  '/pomosh-pri-pereezde',
] as const;
