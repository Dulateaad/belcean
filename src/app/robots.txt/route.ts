
// This file is disabled to avoid conflict with src/app/robots.ts in Next.js 15.
export const dynamic = 'force-static';
export function GET() {
  return new Response('User-agent: *\nAllow: /', {
    headers: { 'Content-Type': 'text/plain' },
  });
}
