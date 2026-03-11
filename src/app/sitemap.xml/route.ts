
// This file is disabled to avoid conflict with src/app/sitemap.ts in Next.js 15.
export const dynamic = 'force-static';
export function GET() {
  return new Response('', {
    headers: { 'Content-Type': 'application/xml' },
  });
}
