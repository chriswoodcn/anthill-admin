import "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  // interface Session {
  //   token?: string;
  //   error?: string;
  //   info?: User
  //   roles?: number[]
  //   permissions?: string[]
  // }

  interface User {
    id: number,
    username: string
    nickname?: string
    userType?: string
    email?: string
    // mobile?: string
    // sex: string
    // avatar?: string
    // status: string
    // comId?: string
    // adminFlag: string
    // createTime: number
    // updateTime: number
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    token: string;
  }
}
