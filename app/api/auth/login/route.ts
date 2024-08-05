import { ApiHandler, ResponseHandler } from '../../_helper/Handlers'
import logger from '@/lib/logger'
import request from '../../_helper/request'
import { setAuthorizationInfo } from '@/lib/jwt'
import { cookies } from 'next/headers'

export const POST = ApiHandler(
  async (req) => {
    const body = await req.json()
    logger.debug("POST /api/auth/login", body)
    const res = await request("/backend/login", {
      method: "POST",
      data: body
    })
    if (res.status == 200) {
      if (res.data.data.token) {
        setAuthorizationInfo(cookies, {
          token: res.data.data.token,
          permissions: res.data.data.permissions,
          roles: res.data.data.roles
        })
        return ResponseHandler({ code: 200, data: res.data.data.info })
      }
      return res.data
    } else {
      throw new Error(res.statusText)
    }
  }
)
export const dynamic = 'force-dynamic'
