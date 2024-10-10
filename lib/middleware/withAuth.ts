import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import logger, { Logger } from '../logger';
import { MiddlewareFactory } from './stackMiddlewares';
import configuration from '@/configuration.mjs';
import { withBasePath } from '..';
import { cookies } from 'next/headers'

logger.setLevel(Logger.Levels.INFO)

export const withAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const authorization = cookies().get('Authorization')?.value
    logger.debug("withAuth Authorization", authorization)
    logger.debug("request.nextUrl.pathname", request.nextUrl.pathname)

    if ((configuration.PathAlias.Admin.Pattern as RegExp).test(request.nextUrl.pathname) && configuration.PathAlias.Admin.Login != request.nextUrl.pathname) {
      if (!authorization)
        return redirectAdminLogin(request)
    }
    return next(request, _next);
  };
};
/**
 * 重定向后管登录页
 */
const redirectAdminLogin = (request: NextRequest) => {
  const loginUrl = new URL(withBasePath(configuration.PathAlias.Admin.Login), request.nextUrl.origin)
  loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}


