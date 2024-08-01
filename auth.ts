import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import logger from "@/lib/logger"
import configuraton from './configuration.mjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  logger: {
    error(code, ...message) {
      logger.error(code, message)
    },
    warn(code, ...message) {
      logger.warn(code, message)
    },
    debug(code, ...message) {
      logger.debug(code, message)
    },
  },
  basePath: configuraton.BasePath,
  providers: [Credentials({
    id: "credentials",
    name: "credentials",
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      logger.debug("providers credentials authorize", credentials)
      // logic to verify if the user exists
      const user: User = { id: "123", username: 'test', email: "test@taotaozn.com" }
      return user
    },
  }),],
  callbacks: {
    async authorized({ request, auth }) {
      logger.debug("callbacks authorized params request", request)
      logger.debug("callbacks authorized params auth", auth)
      const url = request.nextUrl
      const user = auth?.user;

      if (url.pathname.startsWith('/admin/index') && !user) {
        return false
      }

      return true
    },
    async session({ session, token, user }) {
      logger.debug("callbacks session params session", session)
      logger.debug("callbacks session params token", token)
      logger.debug("callbacks session params user", user)
      return session
    },
    async redirect({ url, baseUrl }) {
      logger.debug("callbacks redirect params url", url)
      logger.debug("callbacks redirect params baseUrl", baseUrl)
      return baseUrl
    }
  },
  pages: {
    signIn: "/admin/login"
  },
})
