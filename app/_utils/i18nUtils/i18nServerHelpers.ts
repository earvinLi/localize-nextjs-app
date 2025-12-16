// External Dependencies
import { headers } from 'next/headers';
import { Namespace, FlatNamespace, KeyPrefix } from 'i18next';
import { FallbackNs } from 'react-i18next';

// Type Definitions
type $Tuple<T> = readonly [T?, ...T[]];
type $FirstNamespace<Ns extends Namespace> = Ns extends readonly never[] ? Ns[0] : Ns;

// Local Dependencies
import i18next from './i18nextInstance';
import { headerName } from './i18nConfig';

export async function getT<
  Ns extends FlatNamespace | $Tuple<FlatNamespace>,
  KPrefix extends KeyPrefix<
    FallbackNs<Ns extends FlatNamespace ? FlatNamespace : $FirstNamespace<FlatNamespace>>
  > = undefined,
>(namespace?: Ns, options: { keyPrefix?: KPrefix } = {}) {
  const headerList = await headers();
  const headerLocale = headerList.get(headerName);

  if (headerLocale && i18next.resolvedLanguage !== headerLocale) {
    await i18next.changeLanguage(headerLocale);
  }

  if (namespace && !i18next.hasLoadedNamespace(namespace as string | string[])) {
    await i18next.loadNamespaces(namespace as string | string[]);
  }

  return {
    t: i18next.getFixedT(headerLocale, namespace as string | string[], options.keyPrefix),
    resolvedLanguage: i18next.resolvedLanguage,
  };
}
