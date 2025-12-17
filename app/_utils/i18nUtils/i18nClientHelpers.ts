'use client';

// External Dependencies
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Namespace, KeyPrefix } from 'i18next';
import { useTranslation, UseTranslationOptions } from 'react-i18next';

// Local Dependencies
import i18next from './i18nextInstance';

// Local Variables
const runsOnServerSide = typeof window === 'undefined';

export function useT(
  namespace: string | string[],
  options?: UseTranslationOptions<KeyPrefix<Namespace>>,
) {
  const paramsLocale = useParams().locale;

  if (typeof paramsLocale !== 'string') {
    throw new Error("'useT' is only available inside '/app/(routes)/[locale]'");
  }

  const [activeLocale, setActiveLocale] = useState(i18next.resolvedLanguage);

  useEffect(() => {
    if (runsOnServerSide && i18next.resolvedLanguage !== paramsLocale) {
      void i18next.changeLanguage(paramsLocale);
    } else {
      if (activeLocale === i18next.resolvedLanguage) return;
      setActiveLocale(i18next.resolvedLanguage); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [paramsLocale, activeLocale]);

  useEffect(() => {
    if (runsOnServerSide && i18next.resolvedLanguage !== paramsLocale) {
      void i18next.changeLanguage(paramsLocale);
    } else {
      if (!paramsLocale || i18next.resolvedLanguage === paramsLocale) return;
      void i18next.changeLanguage(paramsLocale);
    }
  }, [paramsLocale]);

  const { t, i18n } = useTranslation(namespace, options);
  return { t, resolvedLanguage: i18n.resolvedLanguage };
}
