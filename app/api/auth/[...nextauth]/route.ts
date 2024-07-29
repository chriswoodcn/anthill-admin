// import NextAuth, { User } from 'next-auth'
// import CredentialsProvider from "next-auth/providers/credentials"
// // custom
// import logger from '@/lib/logger'
// import * as AdminApi from "@/api/admin"

// const AdminJwtProvider = CredentialsProvider({
//   name: 'Admin',
//   id: "Admin",
//   credentials: {
//     username: {},
//     password: {},
//     device: {}
//   },
//   async authorize(credentials, req) {
//     logger.debug("AdminJwtProvider authorize")
//     logger.debug("---------- credentials ", credentials)
//     const res = await AdminApi.login(credentials)
//     const response = await res.json()
//     logger.debug("---------- response ", response)

//     const user = { id: "42", name: "test", password: "123456", role: "manager" }

//     if (res.ok && response?.token) {
//       return user
//     }
//     return null
//   }
// })
// export const authOptions = {
//   providers: [
//     AdminJwtProvider
//   ],
// }

// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth(authOptions)
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
