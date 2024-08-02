import useSWR from 'swr';
import { i18next } from "../../i18n/i18n"
import { fallbackLng } from "../../i18n/settings"
import axios from 'axios';
interface FectchOptions {
  url: string;
  method?: string;
  data?: Record<string, any>;
  params?: Record<string, any>;
}
const fetcher = (options: FectchOptions) => axios({
  baseURL: process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL,
  timeout: 10 * 60,
  url: options.url,
  method: options.method ? options.method : "GET",
  data: options.data || undefined,
  params: options.params || undefined,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "language": i18next.language || fallbackLng
  }
}).then(res => res.data)
export default function (action: boolean, options: FectchOptions) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(action ? options : null, (options) => fetcher(options))
  return {
    data, error, isLoading, isValidating, mutate
  }
}
