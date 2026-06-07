'use client';

import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { supportedLangs } from '@/lib/i18n/config';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

function applyLanguage(lang: string) {
  document.cookie = `lang=${lang}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
  document.documentElement.lang = lang;
  window.location.reload();
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = async (lang: string) => {
    applyLanguage(lang);
  };

  const flagsMap = new Map();
  supportedLangs.forEach((lang: string) => {
    const code = lang.split('-')[1].toLowerCase();
    flagsMap.set(lang, `/images/flags/${code}.svg`);
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Menu" className="hover:text-primary hover:bg-primary/10" size="icon" variant="ghost">
          <Languages></Languages>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {[...supportedLangs].sort().map((lang: string) => (
          <DropdownMenuCheckboxItem key={lang} checked={lang === i18n.language} className="py-2" onCheckedChange={() => changeLanguage(lang)}>
            <div className="flex items-center gap-2">
              <div className="relative h-4 w-4">
                <Image alt={lang} fill={true} src={flagsMap.get(lang)}></Image>
              </div>
              <span>{lang}</span>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
