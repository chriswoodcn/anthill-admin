import { cookies } from 'next/headers'

import request from '../../_helper/request'
import logger from '@/lib/logger'
import { ApiHandler, ResponseHandler } from '../../_helper/Handlers'
import { setAuthorizationInfo } from '@/lib/jwt'

export const GET = ApiHandler(
  async (req) => {
    logger.debug("GET /api/auth/logout")
    const res: any = await request("/backend/logout", {
      method: "GET",
    })
    //删除cookie
    setAuthorizationInfo(cookies, null)
    return ResponseHandler({ code: res.code, data: res.data, message: res.msg })
  }
)

export const dynamic = 'force-dynamic'
