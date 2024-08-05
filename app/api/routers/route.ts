import logger from '@/lib/logger'
import { ApiHandler } from '../_helper/Handlers'
import request from '../_helper/request'

export const GET = ApiHandler(
  async (req) => {
    const body = await req.json()
    logger.debug("GET /api/routers", body)
    const res = await request("/backend/getRouters", {
      method: "POST",
      data: body
    })

  }
)

export const dynamic = 'force-dynamic'
