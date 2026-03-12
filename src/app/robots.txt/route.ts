// Нейтрализовано для исправления конфликта с /app/robots.ts в Next.js 15
export const dynamic = 'force-static';
export function GET() {
  return new Response(null, { status: 404 });
}
