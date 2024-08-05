import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';


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
  if (!data) return
  const authorization = jsonwebtoken.sign(data, SECRET)
  cookies().set("Authorization", authorization)
}
export const decodeAuthorization = (authorization?: string) => {
  if (!authorization) return null
  const decoded = jsonwebtoken.verify(authorization, SECRET);
  return (decoded as JwtPayload)
}
