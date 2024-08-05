import { cookies } from 'next/headers'

import request from '../../_helper/request'
import logger from '@/lib/logger'
import { ApiHandler, ResponseHandler } from '../../_helper/Handlers'
import { setAuthorizationInfo } from '@/lib/jwt'

export const GET = ApiHandler(
  async (req) => {
    const body = await req.json()
    logger.debug("GET /api/routers", body)
    const res = await request("/backend/logout", {
      method: "GET",
      data: body
    })
    if (res.status == 200) {
      setAuthorizationInfo(cookies, null)
    }
    return ResponseHandler({ code: res.data.code, data: res.data.data, message: res.data.message })
  }
)

export const dynamic = 'force-dynamic'
