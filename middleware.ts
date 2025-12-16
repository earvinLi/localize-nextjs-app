/* check https://nextjs.org/docs/app/api-reference/file-conventions/middleware for more info */

// External Dependencies
import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';

// Internal Dependencies
import { defaultLocale, appLocales, cookieName, headerName } from '@/utils/i18nUtils/i18nConfig';

acceptLanguage.languages(appLocales);

export const config = {
  // Todo: should load localized images if possible
  /*
    avoid matching for:
    - api (API routes)
    - cosmos (react cosmos routes)
    - _next/static (static files)
    - _next/images (image optimization files)
    - images (/public/images files)
  */
  matcher: ['/((?!api|cosmos|_next/static|_next/image|images).*)'],
};

export function middleware(req: NextRequest) {
  // ignore paths with 'icon' or 'chrome'
  if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1) {
    return NextResponse.next();
  }

  // check if the language is already in the path
  const pathLocale = appLocales.find((appLocale) =>
    req.nextUrl.pathname.startsWith(`/${appLocale}`),
  );

  // if locale is not in path, redirect to include it
  if (!pathLocale) {
    let targetLocale;
    // try to get locale from cookie
    if (req.cookies.has(cookieName))
      targetLocale = acceptLanguage.get(req.cookies.get(cookieName)?.value);
    // if no cookie, check 'Accept-Language' header
    if (!targetLocale) targetLocale = acceptLanguage.get(req.headers.get('Accept-Language'));
    // default to fallback locale if still undefined
    if (!targetLocale) targetLocale = defaultLocale;

    const newPathWithLocale = `/${targetLocale}${req.nextUrl.pathname}${req.nextUrl.search}`;
    return NextResponse.redirect(new URL(newPathWithLocale, req.url));
  }

  // just set 'x-i18next-current-locale' header to 'pathLocale' if 'pathLocale' exists
  const headers = new Headers(req.headers);
  headers.set(headerName, pathLocale);
  return NextResponse.next({ headers });

  // Todo: whether to add this 'referer' back?
  /*
   // if a referer exists, try to detect locale from there and set the cookie accordingly
   if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '');
    const refererLocale = appLocales.find((locale) => refererUrl.pathname.startsWith(`/${locale}`));
    if (refererLocale) {
      const headers = new Headers(req.headers);
      headers.set(headerName, refererLocale);
      const response = NextResponse.next({ headers });
      response.cookies.set(cookieName, refererLocale);
      return response;
    }
  } */
}
