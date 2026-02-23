'use client';

import { Languages } from 'lucide-react';
import { Button, Dropdown, Label } from '@heroui/react';
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
    <Dropdown>
      <Button isIconOnly aria-label="Menu" variant="ghost">
        <Languages></Languages>
      </Button>
      <Dropdown.Popover className="min-w-0 w-30">
        <Dropdown.Menu onAction={(id) => changeLanguage(id.toString())}>
          {supportedLangs.sort().map((lang: string) => (
            <Dropdown.Item key={lang} id={lang} textValue={lang}>
              <div className="flex items-center gap-2">
                <Image alt={lang} height={16} src={flagsMap.get(lang)} width={16}></Image>
                <Label>{lang}</Label>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
