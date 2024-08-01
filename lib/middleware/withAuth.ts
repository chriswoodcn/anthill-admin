import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import logger from '../logger';
import { MiddlewareFactory } from './stackMiddlewares';
import configuration from '@/configuration.mjs';
import { withBasePath } from '..';

export const withAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    if ((configuration.PathAlias.Admin.Pattern as RegExp).test(request.nextUrl.pathname) && configuration.PathAlias.Admin.Login != request.nextUrl.pathname) {

      return NextResponse.redirect(new URL(withBasePath(configuration.PathAlias.Admin.Login), request.url))
    }
    return next(request, _next);
  };
};
