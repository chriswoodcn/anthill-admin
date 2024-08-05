import { cookies } from 'next/headers'

import { ApiHandler, ResponseHandler } from '../../_helper/Handlers'
import logger from '@/lib/logger'
import request from '../../_helper/request'
import { setAuthorizationInfo } from '@/lib/jwt'

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
        //权限信息及凭证保存到cookie中
        setAuthorizationInfo(cookies, {
          token: res.data.data.token,
          permissions: res.data.data.permissions,
          roles: res.data.data.roles
        })
        //仅返回用户信息
        return ResponseHandler({ code: res.data.code, data: res.data.data.info })
      }
      return ResponseHandler({ code: res.data.code, data: res.data.data, message: res.data.message })
    } else {
      throw new Error(res.statusText)
    }
  }
)
export const dynamic = 'force-dynamic'
