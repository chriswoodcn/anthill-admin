import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import logger from '../logger';
import { MiddlewareFactory } from './stackMiddlewares';
import configuration from '@/configuration.mjs';
import { withBasePath } from '..';
import { cookies } from 'next/headers'

export const withAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const sesssion = cookies().get('session')?.value
    logger.debug("withAuth cookies", cookies().getAll())
    logger.debug("withAuth sesssion", sesssion)
    if ((configuration.PathAlias.Admin.Pattern as RegExp).test(request.nextUrl.pathname) && configuration.PathAlias.Admin.Login != request.nextUrl.pathname) {

      return NextResponse.redirect(new URL(withBasePath(configuration.PathAlias.Admin.Login), request.nextUrl.origin))
    }
    return next(request, _next);
  };
};
