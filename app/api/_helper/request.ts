import axios from "axios";
import { cookies } from "next/headers"
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { fallbackLng } from '@/i18n/settings';
import { SECRET } from '@/lib/jwt';
import logger from '@/lib/logger';
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
      config.headers["token"] = "Bearer " + token;
    }
    logger.debug("request config", config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (res) => {
    // logger.debug("request response status", res.status)
    // logger.debug("request response data", res.data)
    return res.data
  }, (error) => {
    return Promise.reject(error);
  })
export default request
