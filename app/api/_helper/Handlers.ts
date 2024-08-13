import { NextRequest, NextResponse } from 'next/server'
import logger from '@/lib/logger'

function isPublicPath(req: NextRequest) {
  // public routes that don't require authentication
  const publicPaths = [`POST:/api/auth/login`]
  return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`)
}

export function ApiHandler(handler: (req: NextRequest, ...args: any[]) => Promise<any>) {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      if (!isPublicPath(req)) {
        // throw new Error("not public api path")
      }
      // route handler
      const responseBody = await handler(req, ...args)
      return NextResponse.json(responseBody || {})
    } catch (err) {
      // global error handler
      return ErrorHandler(err)
    }
  }
}
export interface ResponseData {
  code: number
  message?: string
  data?: any
}
export function ResponseHandler(data: ResponseData): ResponseData {
  return {
    code: data.code || 200,
    message: data.message || 'success',
    data: data.data || null,
  }
}
export function ErrorHandler(err: any) {
  logger.debug("ErrorHandler error", err)
  return NextResponse.json({
    code: 500,
    message: err.message || "error",
  })
}
