// app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';

const SUPPORTED = ['es','en'] as const;
type Locale = (typeof SUPPORTED)[number];

export function generateStaticParams() {
  return SUPPORTED.map((l) => ({locale: l}));
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await props.params;
  if (!SUPPORTED.includes(locale as Locale)) notFound();

  // Import directo del JSON (sin getMessages)
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale as Locale} messages={messages}>
      {props.children}
    </NextIntlClientProvider>
  );
}
