import axios from 'axios';
import logger from './logger';
import { fallbackLng } from '@/i18n/settings';
import { store } from "@/store"
import { i18next } from '@/i18n/client';

/**
 * 向本地node服务器请求，即 next api router
 */
export const nextFetcher = async (options: Record<string, any>) => {
  logger.debug("nextFetcher");
  logger.debug("options", options);
  return axios({
    ...options,
    baseURL: "",
    timeout: 10 * 1000,
    method: options.method ? options.method : "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: store.getState().adminUser.token,
      language: i18next.language || fallbackLng,
    },
  }).then((res) => {
    logger.debug("res.data", res.data);
    return res.data
  });
}
/**
 * 向远程服务器请求，即 remote api 接口
 * 需要配置好 NEXT_PUBLIC_ADMIN_API_BASE_URL
 */
export const adminFetcher = async (options: Record<string, any>) => {
  logger.debug("fetcher");
  logger.debug("options", options);
  return axios({
    ...options,
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL,
    timeout: 10 * 1000,
    method: options.method ? options.method : "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: "Bearer " + store.getState().adminUser.token,
      language: i18next.language || fallbackLng,
    },
  }).then((res) => {
    logger.debug("res.data", res.data);
    return res.data
  });
}
