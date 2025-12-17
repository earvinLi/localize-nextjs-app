// External Dependencies
import { headers } from 'next/headers';
import { Namespace, KeyPrefix } from 'i18next';

// Local Dependencies
import i18next from './i18nextInstance';
import { headerName } from './i18nConfig';

export async function getT(namespace: string | string[], options?: KeyPrefix<Namespace>) {
  const headerList = await headers();
  const headerLocale = headerList.get(headerName);

  if (headerLocale && i18next.resolvedLanguage !== headerLocale) {
    await i18next.changeLanguage(headerLocale);
  }

  if (namespace && !i18next.hasLoadedNamespace(namespace)) {
    await i18next.loadNamespaces(namespace);
  }

  return {
    // 'getFixedT' defaults 't' to header locale and the given namespace
    t: i18next.getFixedT(headerLocale, namespace, options),
    resolvedLanguage: i18next.resolvedLanguage,
  };
}
