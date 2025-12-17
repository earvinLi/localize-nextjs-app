// External Dependencies
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

// Local Dependencies
import { defaultLocale, appLocales, defaultNamespace } from './i18nConfig';

// Local Variables
const runsOnServerSide = typeof window === 'undefined';

void i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (locale: string, namespace: string) =>
        import(`../../../public/locales/${locale}/${namespace}.json`),
    ),
  )
  .init({
    // debug: true,
    supportedLngs: appLocales,
    fallbackLng: defaultLocale,
    lng: undefined, // detect the language on client side
    fallbackNS: defaultNamespace,
    defaultNS: defaultNamespace,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? appLocales : [],
  });

export default i18next;
