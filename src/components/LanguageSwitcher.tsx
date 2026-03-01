'use client';

import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { supportedLangs } from '@/proxy';
import Image from 'next/image';
import i18n from '@/lib/i18n/client';

export default function LanguageSwitcher() {
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
      <DropdownMenuContent className="w-30 min-w-0">
        {supportedLangs.sort().map((lang: string) => (
          <DropdownMenuItem key={lang} className="cursor-pointer" onClick={() => changeLanguage(lang)}>
            <div className="flex items-center gap-2">
              <Image alt={lang} height={16} src={flagsMap.get(lang)} width={16}></Image>
              <Label className="cursor-pointer">{lang}</Label>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
