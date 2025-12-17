'use client';

// External Dependencies
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import * as z from 'zod';
import { Languages as LanguagesIcon } from 'lucide-react';

// Internal Dependencies
import DropdownMenu from '@/components/base/DropdownMenu';
import IconButton from '@/components/base/IconButton';
import { useT } from '@/utils/i18nUtils/i18nClientHelpers';
import { cookieName } from '@/utils/i18nUtils/i18nConfig';

// Local Variables
const zodLocales = {
  'en-US': z.locales.en(),
  'zh-CN': z.locales.zhCN(),
  'ja-JP': z.locales.ja(),
};

// Type Definitions
type LanguageChangerProps = {
  variantClassname?: string;
};

// Component Definition
export default function LanguageChanger(props: LanguageChangerProps) {
  const { variantClassname = '' } = props;

  const { t, resolvedLanguage } = useT('component_language_changer');
  const currentLocale = resolvedLanguage;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChangeLocale = (newLocale: string) => {
    // set cookie for 'react-i18next' to get correct locale
    const cookieValidDays = 30;
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + cookieValidDays * 24 * 60 * 60 * 1000);
    const expireDate = currentDate.toUTCString();
    document.cookie = `${cookieName}=${newLocale};expires=${expireDate};path=/`;

    // change 'zod' locale
    z.config(zodLocales[newLocale as keyof typeof zodLocales]);

    // redirect to the new locale path
    const newPathname = currentPathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  const localeData = [
    {
      name: 'English',
      onClick: () => handleChangeLocale('en-US'),
    },
    {
      name: '中文',
      onClick: () => handleChangeLocale('zh-CN'),
    },
    {
      name: '日本語',
      onClick: () => handleChangeLocale('ja-JP'),
    },
  ];

  return (
    <div className={variantClassname}>
      <DropdownMenu
        anchorElement={
          <IconButton
            icon={<LanguagesIcon color='gray' />}
            tooltip={t('change_locale_button_text')}
            tooltipPosition='bottom'
          />
        }
        optionData={localeData}
      />
    </div>
  );
}
