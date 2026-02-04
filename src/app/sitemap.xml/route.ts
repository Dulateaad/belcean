import { MetadataRoute } from 'next';
import { i18n } from '@/i18n-config';
import ru from '@/dictionaries/ru.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://becleanservis.example.com'; 

  const serviceSlugs = ru.Constants.services.map((service) => service.slug);

  const staticPages = [
    '/',
    '/calculator',
    '/quiz',
  ];
  
  const allPages = [...staticPages, ...serviceSlugs];

  const urls: MetadataRoute.Sitemap = [];

  i18n.locales.forEach((locale) => {
    allPages.forEach((page) => {
      urls.push({
        url: `${baseUrl}/${locale}${page === '/' ? '' : page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '/' ? 1.0 : 0.8,
      });
    });
  });

  return urls;
}
