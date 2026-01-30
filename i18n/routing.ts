import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Список усіх підтримуваних мов
  locales: ['en', 'uk', 'es', 'ru', 'pl'],
 
  // Мова за замовчуванням
  defaultLocale: 'en'
});

// Експортуємо навігаційні хуки, створені на основі конфігурації
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
