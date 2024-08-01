import { stackMiddlewares, withAuth, withLogger, withRoot } from "@/lib/middleware"
export default stackMiddlewares([withLogger, withRoot, withAuth])
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
}
