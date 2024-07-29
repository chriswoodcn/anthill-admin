import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import logger from '../logger';
import { MiddlewareFactory } from './stackMiddlewares';
import { auth } from '@/auth';
import configuration from '@/configuration.mjs';
import { withBasePath } from '..';

export const withAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const session = await auth();
    logger.debug("request", request.url);
    logger.debug("session", session);
    if ((configuration.PathAlias.Admin.Pattern as RegExp).test(request.nextUrl.pathname) && configuration.PathAlias.Admin.Login != request.nextUrl.pathname) {
      if (session?.user?.id) {
        return next(request, _next);
      } else {
        return NextResponse.redirect(new URL(withBasePath(configuration.PathAlias.Admin.Login), request.url))
      }
    }
    return next(request, _next);
  };
};
