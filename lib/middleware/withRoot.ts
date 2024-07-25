import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./type";
import { fallbackLng } from '@/i18n/settings';
import { withComposePath } from '..';

export const withRoot: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // 重定向首页
    if (/^\/$/.test(request.nextUrl.pathname)) {
      const lang = request.cookies.get("i18next")?.value || fallbackLng
      return NextResponse.redirect(new URL(withComposePath("/home", lang), request.url))
    }
    return next(request, _next);
  };
};