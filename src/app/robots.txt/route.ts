// This file is disabled to prevent conflict with src/app/robots.ts
// Next.js 15 prefers the metadata file robots.ts over this route.
export const dynamic = 'force-static';
export function GET() {
  return new Response('User-agent: *\nAllow: /', {
    headers: { 'Content-Type': 'text/plain' },
  });
}
