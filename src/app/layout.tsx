import './globals.css';
import React from 'react';
import { Inter, Noto_Sans_SC, Noto_Sans_TC } from 'next/font/google';
import Analytics from '@/components/Analytics';
import CookieConsent from '@/components/CookieConsent';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getLang } from '@/lib/i18n/lang-context';
import { getServerTranslation, getTranslationsResources } from '@/lib/i18n/server';
import TranslationsProvider from '@/components/TranslationsProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SITE_URL } from '@/lib/site';
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

  const title = t('meta_title');
  const description = t('meta_description');
  const appName = t('app_name');
  const ogImage = {
    url: '/images/logo.png',
    width: 512,
    height: 512,
    alt: appName,
  };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: appName,
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/',
        'it-IT': '/',
        'es-ES': '/',
        'fr-FR': '/',
        'pl-PL': '/',
        'uk-UA': '/',
        'zh-CN': '/',
        'zh-TW': '/',
      },
    },
    openGraph: {
      type: 'website',
      siteName: appName,
      title,
      description,
      url: '/',
      locale: lang.replace('-', '_'),
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
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
            <CookieConsent />
          </TranslationsProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
