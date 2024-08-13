import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import Cookies from "js-cookie"

export const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "QAZxswEDCvfrTGBnhyUJMkiolp"

export const getAuthorizationInfo = (cookies: any) => {
  const authorization = cookies().get("Authorization")?.value
  if (authorization) {
    const decoded = jsonwebtoken.verify(authorization, SECRET);
    return (decoded as JwtPayload)
  } else {
    return {} as JwtPayload
  }
}
export const setAuthorizationInfo = (cookies: any, data: any) => {
  if (!data) {
    cookies().delete("Authorization")
    return
  }
  const authorization = jsonwebtoken.sign(data, SECRET)
  cookies().set("Authorization", authorization)
}

export const decodeAuthorization = (authorization: string) => {
  const decoded = jsonwebtoken.verify(authorization, SECRET);
  return (decoded as JwtPayload)
}

export const getAuthorizationInfoClient = () => {
  const authorization = Cookies.get("Authorization")
  if (authorization) {
    return decodeAuthorization(authorization)
  }
  return undefined
}
