import { stackMiddlewares } from '@/lib/middleware/stackMiddlewares';
import { withRoot } from "@/lib/middleware/withRoot"
import { withLogger } from "@/lib/middleware/withLogger"
import { withAuth } from "@/lib/middleware/withAuth"

const middlewares = [withLogger, withRoot, withAuth]

export default stackMiddlewares(middlewares)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
