import useSWR, { SWRConfiguration } from 'swr'
import dayjs from 'dayjs'
import { withBasePath } from '@/lib'
import { nextFetcher } from '@/lib/fetcher'

export default function useAdminUserLogin(doAction: boolean, params: Record<string, any>, config: SWRConfiguration) {
  const { data, error, isLoading } = useSWR(
    doAction
      ? {
        url: withBasePath("/api/auth/login"),
        method: "POST",
        params: {
          t: dayjs().valueOf(),
        },
        data: params,
      }
      : null,
    nextFetcher, config)

  return {
    user: data,
    isLoading,
    isError: error,
  }
}
