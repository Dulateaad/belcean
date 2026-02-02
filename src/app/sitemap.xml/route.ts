import { MetadataRoute } from 'next';
import { services } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://beclean-pro.example.com'; // Replace with your actual domain

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    '/',
    '/calculator',
    '/quiz',
  ];

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '/' ? 1.0 : 0.9,
  }));

  return [
    ...staticUrls,
    ...serviceUrls,
  ];
}
