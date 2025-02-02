import useSWR, { SWRConfiguration } from 'swr'
import { adminFetcher } from '@/lib/fetcher'

export default function useAdminUserRouter(doAction: boolean, params: Record<string, any> = {}, config: SWRConfiguration) {
  const { data, error, isLoading } = useSWR(
    doAction
      ? {
        url: "/backend/menu/userRouter",
        method: "GET",
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
