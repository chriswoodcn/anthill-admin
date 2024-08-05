import axios from "axios";
import { cookies } from "next/headers"
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { fallbackLng } from '@/i18n/settings';
import { SECRET } from '@/lib/jwt';
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

const request = axios.create({
  timeout: 10 * 1000,
  baseURL: process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL,
})
request.interceptors.request.use(
  (config) => {
    const language = cookies().get("i18next")?.value || fallbackLng
    config.headers["language"] = language;
    const authorization = cookies().get("Authorization")?.value
    if (authorization) {
      const decoded = jsonwebtoken.verify(authorization, SECRET);
      const token = (decoded as JwtPayload).token
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default request
