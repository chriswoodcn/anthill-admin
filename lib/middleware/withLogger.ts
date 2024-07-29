// middleware/withLogging.ts
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import logger from '../logger';
import { MiddlewareFactory } from './stackMiddlewares';

export const withLogger: MiddlewareFactory = (next) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        logger.debug("request", request.url);
        return next(request, _next);
    };
};
