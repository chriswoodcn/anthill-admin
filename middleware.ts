// middleware.ts
// import { stackMiddlewares } from './_middleware/stackMiddlewares';
// import { withHeaders } from "./_middleware/withHeaders";
// import { withLogging } from "./_middleware/withLogging";

// const middlewares = [withLogging, withHeaders];

// export default stackMiddlewares(middlewares);

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/about')) {
        return NextResponse.rewrite(new URL('/about-2', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.rewrite(new URL('/dashboard/user', request.url))
    }
}
