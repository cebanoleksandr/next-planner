import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // Список усіх підтримуваних мов
  locales: ['en', 'uk', 'es', 'ru', 'pl'],
 
  // Мова за замовчуванням, якщо префікс не вказано (наприклад, просто /dashboard)
  defaultLocale: 'en'
});
 
export const config = {
  // Matcher ігнорує внутрішні файли Next.js (_next, static files, images...)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};