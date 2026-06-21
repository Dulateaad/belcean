import { HERO_BANNER_IMAGE } from '@/lib/hero-image';

export type ServiceCardImage = {
  src: string;
  /** Скрыть водяной знак снизу — обрезка через object-position */
  cropBottom?: boolean;
};

export const SERVICE_CARD_IMAGES: Record<string, ServiceCardImage> = {
  '/generalnaya-uborka': {
    src: HERO_BANNER_IMAGE,
    cropBottom: true,
  },
  '/poslestroitelnaya-uborka': {
    src: 'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_fkfn89fkfn89fkfn.png?alt=media&token=d0c87cac-6f1f-4e23-b16f-7a095ad69e41',
  },
  '/vlazhnaya-uborka': {
    src: 'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_u1o89xu1o89xu1o8.png?alt=media&token=44489fa3-4347-45cf-8b39-f91f5fe9642e',
  },
  '/uborka-ofisov-tashkent': {
    src: 'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_cz8v6ocz8v6ocz8v.png?alt=media&token=e459b048-1b5d-4d9a-a9a4-b8d5d7ae0fb2',
  },
  '/himchistka-mebeli': {
    src: 'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_795fno795fno795f.png?alt=media&token=195be34a-df57-4ae5-8c3e-c76e7457f177',
  },
  '/chistka-kover': {
    src: 'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_jdfh19jdfh19jdfh.png?alt=media&token=2fdee295-602b-4cd6-b408-61c26fc1a852',
  },
  '/moika-okon': {
    src: 'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_5vak5o5vak5o5vak.png?alt=media&token=0c906ff9-d4c2-441c-829b-88b4732d51c4',
  },
  '/pomosh-pri-pereezde': {
    src: 'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_v6nqmkv6nqmkv6nq.png?alt=media&token=c05429d3-1784-4a70-9d42-11ee256d207c',
  },
};

export const WORK_ALGORITHM_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/studio-459358167-4d676.firebasestorage.app/o/Gemini_Generated_Image_wxscbawxscbawxsc.png?alt=media&token=42514903-3c20-497a-9a03-a2114cf0c87e';

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
