'use client';

import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <label className="">
      <p className="mb-2 font-semibold">{t('label')}</p>
      <select
        defaultValue={localActive}
        className="w-100 p-2 outline-yellow-500 border border-gray-100 rounded-xl resize-none bg-gray-800 text-white
        focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
