import NextAuth, { CookiesOptions, Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      // httpOnly: true,
      sameSite: "none",
      path: "/",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      // secure: true,
    },
  },
  callbackUrl: {
    name: `next-auth.callback-url`,
    options: {
    },
  },
  csrfToken: {
    name: "next-auth.csrf-token",
    options: {
    },
  },
};

//后管平台登录auth
const AdminJwtProvider = CredentialsProvider({
  // The name to display on the sign in form (e.g. 'Sign in with...')
  name: 'Admin',
  id: "Admin",
  // The credentials is used to generate a suitable form on the sign in page.
  // You can specify whatever fields you are expecting to be submitted.
  // e.g. domain, username, password, 2FA token, etc.
  // You can pass any HTML attribute to the <input> tag through the object.
  credentials: {
    username: {},
    password: {},
    device: {}
  },
  async authorize(credentials, req) {
    // You need to provide your own logic here that takes the credentials
    // submitted and returns either a object representing a user or value
    // that is false/null if the credentials are invalid.
    // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    // You can also use the `req` object to obtain additional parameters
    // (i.e., the request IP address)
    const res = await fetch("/backend/login", {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" }
    })
    const response = await res.json()

    // If no error and we have user data, return it
    if (res.ok && response?.token) {
      return response
    }
    // Return null if user data could not be retrieved
    return null
  }
})
const AdminJwtCb = async (responseData: Session | null) => {
  if (responseData == null) return new Error("login error")
  return responseData;
};

const session = (responseData: Session | null) => {
  if (responseData == null) {
    return Promise.reject({
      error: new Error("login error"),
    });
  }
  return Promise.resolve(session);
};


const handler = NextAuth({
  providers: [AdminJwtProvider],
  session: {
    strategy: "jwt",
  },
  cookies: cookies,
  callbacks: {
    session,
    jwt,
  },
})

export { handler as GET, handler as POST }
