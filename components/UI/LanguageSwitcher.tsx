'use client';

import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale(); // Отримуємо активну мову

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    startTransition(() => {
      // replace замінює поточний URL на новий з новою мовою
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <label className="border-2 rounded">
      <p className="sr-only">Change language</p>
      <select
        defaultValue={localActive}
        className="bg-transparent py-2"
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">English</option>
        <option value="uk">Українська</option>
        <option value="es">Español</option>
        <option value="ru">Русский</option>
        <option value="pl">Polski</option>
      </select>
    </label>
  );
}
