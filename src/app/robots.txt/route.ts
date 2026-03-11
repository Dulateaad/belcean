// Этот файл удален, чтобы избежать конфликта с src/app/robots.ts
// В Next.js 15 метаданные robots обрабатываются через robots.ts
export const dynamic = 'force-static';
export function GET() {
  return new Response('Robots metadata is handled by src/app/robots.ts', { status: 404 });
}
