'use client';

import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { supportedLangs } from '@/proxy';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang, () => {
      document.cookie = `lang=${lang}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
      document.documentElement.lang = lang;
      window.location.reload();
    });
  };

  const flagsMap = new Map();
  supportedLangs.forEach((lang: string) => {
    const code = lang.split('-')[1].toLowerCase();
    flagsMap.set(lang, `/images/flags/${code}.svg`);
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Menu" size="icon" variant="ghost">
          <Languages></Languages>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 min-w-0">
        {supportedLangs.sort().map((lang: string) => (
          <DropdownMenuItem key={lang} className="py-2" onClick={() => changeLanguage(lang)}>
            <div className="flex items-center gap-2">
              <div className="relative h-4 w-4">
                <Image alt={lang} fill={true} src={flagsMap.get(lang)}></Image>
              </div>
              <Label>{lang}</Label>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
