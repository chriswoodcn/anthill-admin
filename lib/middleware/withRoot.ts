import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { withBasePath } from '..';
import configuration from "../../configuration.mjs"
import { MiddlewareFactory } from './stackMiddlewares';
import logger from '../logger';

export const withRoot: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // 重定向首页
    if (/^\/$/.test(request.nextUrl.pathname) || "" == request.nextUrl.pathname) {
      return NextResponse.redirect(new URL(withBasePath(configuration.PathAlias.Admin.Root), request.nextUrl.origin))
    }
    return next(request, _next);
  };
};
