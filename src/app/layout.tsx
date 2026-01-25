import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getLang } from '@/lib/i18n/lang-context';
import { getServerTranslation } from '@/lib/i18n/server';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
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

  return (
    <html className={`${inter.className} dark`} lang={lang}>
      <body className="text-foreground bg-background flex h-screen w-full flex-col text-center">
        <Header />
        <main className="flex w-full grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
