
// This route is disabled to prevent conflict with src/app/sitemap.ts
export const dynamic = 'force-static';
export function GET() {
  return new Response('', {
    headers: { 'Content-Type': 'application/xml' },
  });
}
