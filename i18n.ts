// i18n.ts
import {getRequestConfig} from 'next-intl/server';

export const locales = ['es', 'en'] as const;
export const defaultLocale = 'es';

export default getRequestConfig(async ({locale}) => {
  const l = (locales as readonly string[]).includes(locale ?? '')
    ? (locale as (typeof locales)[number])
    : defaultLocale;

  return {
    locale: l, // <- requerido por algunas versiones de next-intl
    messages: (await import(`./messages/${l}.json`)).default
  };
});
