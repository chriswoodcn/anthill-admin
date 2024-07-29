import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import logger from "@/lib/logger"
import configuraton from './configuration.mjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
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
      logger.debug("credentials", credentials)
      // logic to verify if the user exists
      const user: User = { id: "123", username: 'test', email: "test@taotaozn.com" }
      if (!user) {
        throw new Error("User not found.")
      }
      return user
    },
  }),],
  pages: {
    signIn: "/admin/login"
  },
})
