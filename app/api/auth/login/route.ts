import { cookies } from 'next/headers'

import { ApiHandler, ResponseHandler } from '../../_helper/Handlers'
import logger from '@/lib/logger'
import request from '../../_helper/request'
import { setAuthorizationInfo } from '@/lib/jwt'

export const POST = ApiHandler(
  async (req) => {
    const body = await req.json()
    logger.debug("POST /api/auth/login", body)
    const res: any = await request("/backend/login", {
      method: "POST",
      data: body
    })
    logger.debug("res", res)
    if (res.code == 200) {
      if (res.data.token) {
        //权限信息及凭证保存到cookie中
        setAuthorizationInfo(cookies, {
          userId: res.data.info.id,
          token: res.data.token,
          permissions: res.data.permissions,
          roles: res.data.roles
        })
        //仅返回用户信息
        return ResponseHandler({ code: res.code, data: res.data.info, message: res.msg })
      } else {
        setAuthorizationInfo(cookies, null)
      }
    }
    return ResponseHandler({ code: res.code, data: res.data, message: res.msg })
  }
)
export const dynamic = 'force-dynamic'
