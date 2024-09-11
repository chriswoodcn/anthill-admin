import useSWR, { SWRConfiguration } from 'swr'
import dayjs from 'dayjs'
import { adminFetcher } from '@/lib/fetcher'

export default function useAdminUserRouter(doAction: boolean, params: Record<string, any> = {}, config: SWRConfiguration) {
  const { data, error, isLoading } = useSWR(
    doAction
      ? {
        url: "/backend/menu/userRouter",
        method: "GET",
        params: {
          t: dayjs().valueOf(),
        },
        data: params,
      }
      : null,
    adminFetcher,
    config)

  return {
    user: data,
    isLoading,
    isError: error,
  }
}
