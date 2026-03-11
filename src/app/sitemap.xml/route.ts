// Этот файл удален, чтобы избежать конфликта с src/app/sitemap.ts
// В Next.js 15 метаданные sitemap обрабатываются через sitemap.ts
export const dynamic = 'force-static';
export function GET() {
  return new Response('Sitemap metadata is handled by src/app/sitemap.ts', { status: 404 });
}
