
// This route is disabled to prevent conflict with src/app/robots.ts
export const dynamic = 'force-static';
export function GET() {
  return new Response('User-agent: *\nAllow: /', {
    headers: { 'Content-Type': 'text/plain' },
  });
}
