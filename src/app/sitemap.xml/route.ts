// This file is disabled to prevent conflict with src/app/sitemap.ts
// Next.js 15 prefers the metadata file sitemap.ts over this route.
export const dynamic = 'force-static';
export function GET() {
  return new Response('', {
    headers: { 'Content-Type': 'application/xml' },
  });
}
