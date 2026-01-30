import { getRequestConfig } from 'next-intl/server';
// import { routing } from './routing'; // Ми створимо це в наступному кроці, або можна захардкодити

export default getRequestConfig(async ({ requestLocale }) => {
  // Перевіряємо, чи підтримується локаль. Якщо ні — використовуємо дефолтну.
  let locale = await requestLocale;
  
  // Список підтримуваних мов
  const supportedLocales = ['en', 'uk', 'es', 'ru', 'pl']; // Додайте інші підтримувані мови за потреби
  
  if (!locale || !supportedLocales.includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
