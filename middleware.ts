import { NextResponse } from 'next/server';
import { auth } from './auth'
import configuration from './configuration.mjs';
import logger from './lib/logger';
import { withBasePath } from './lib';

export default auth((request) => {
  const session = request.auth
  logger.debug("request", request.nextUrl);
  logger.debug("session", session);
  // 重定向首页
  if (/^\/$/.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(withBasePath(configuration.PathAlias.Admin.Root), request.url))
  }
  if ((configuration.PathAlias.Admin.Pattern as RegExp).test(request.nextUrl.pathname) && configuration.PathAlias.Admin.Login != request.nextUrl.pathname) {
    if (session?.user?.email) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL(withBasePath(configuration.PathAlias.Admin.Login), request.url))
    }
  }
})
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
}
