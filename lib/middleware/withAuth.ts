import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import logger from '../logger';
import { MiddlewareFactory } from './stackMiddlewares';
import configuration from '@/configuration.mjs';
import { withBasePath } from '..';
import { cookies } from 'next/headers'

export const withAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {

    const sesssion = cookies().get('session')?.value
    const authorization = cookies().get('Authorization')?.value
    logger.debug("withAuth Authorization", authorization)
    logger.debug("withAuth sesssion", sesssion)

    if ((configuration.PathAlias.Admin.Pattern as RegExp).test(request.nextUrl.pathname) && configuration.PathAlias.Admin.Login != request.nextUrl.pathname) {
      if (!authorization)
        return redirectAdminLogin(request)
    }
    return next(request, _next);
  };
};
const redirectAdminLogin = (request: NextRequest) =>
  NextResponse.redirect(new URL(withBasePath(configuration.PathAlias.Admin.Login), request.nextUrl.origin))

