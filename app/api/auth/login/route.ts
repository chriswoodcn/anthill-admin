import { ApiHandler, ResponseHandler } from '../../_helper/Handlers'
import logger from '@/lib/logger'
export const POST = ApiHandler(
  async (req) => {
    const body = await req.json()
    logger.debug("POST /api/auth/login", body)
    return ResponseHandler({
      code: 200,
      data: { token: 'giodamgikmpfdaglgaodgpkaokgdpalgpdoasglpagadlgpalgadgsdg,otpwrkho' },
      message: '登录成功',
    })
  }
)
export const dynamic = 'force-dynamic'
