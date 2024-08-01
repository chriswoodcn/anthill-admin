import { stackMiddlewares, withAuth, withRoot } from "@/lib/middleware"
export default stackMiddlewares([withRoot, withAuth])
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
}
