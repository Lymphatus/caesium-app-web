import './globals.css';
import React from 'react';
import { Inter, Noto_Sans_SC, Noto_Sans_TC } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getLang } from '@/lib/i18n/lang-context';
import { getServerTranslation, getTranslationsResources } from '@/lib/i18n/server';
import TranslationsProvider from '@/components/TranslationsProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cjk',
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cjk',
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const { t } = await getServerTranslation(lang, 'common');

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      languages: {
        'en-US': process.env.NEXT_PUBLIC_SITE_URL || '',
        'it-IT': process.env.NEXT_PUBLIC_SITE_URL || '',
        'es-ES': process.env.NEXT_PUBLIC_SITE_URL || '',
        'fr-FR': process.env.NEXT_PUBLIC_SITE_URL || '',
        'pl-PL': process.env.NEXT_PUBLIC_SITE_URL || '',
        'uk-UA': process.env.NEXT_PUBLIC_SITE_URL || '',
        'zh-CN': process.env.NEXT_PUBLIC_SITE_URL || '',
        'zh-TW': process.env.NEXT_PUBLIC_SITE_URL || '',
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();

  const namespaces = ['common', 'compressor', 'error', 'about'];
  const resources = await getTranslationsResources(lang, namespaces);

  const cjkFontClass = lang === 'zh-CN' ? notoSansSC.variable : lang === 'zh-TW' ? notoSansTC.variable : '';

  return (
    <html suppressHydrationWarning className={`${inter.className} ${cjkFontClass}`} lang={lang}>
      <body className="bg-background text-foreground flex h-screen w-full flex-col text-center">
        <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
          <TranslationsProvider locale={lang} namespaces={namespaces} resources={resources}>
            <Header />
            <TooltipProvider>
              <main className="flex w-full grow">{children}</main>
            </TooltipProvider>
            <Footer />
          </TranslationsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
