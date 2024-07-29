import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { withBasePath } from '..';
import configuration from "../../configuration.mjs"
import { MiddlewareFactory } from './stackMiddlewares';

export const withRoot: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // 重定向首页
    if (/^\/$/.test(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(withBasePath(configuration.PathAlias.Admin.Root), request.url))
    }
    return next(request, _next);
  };
};
