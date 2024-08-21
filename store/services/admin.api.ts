import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

export enum TagType {
  AdminUser = "AdminUser",
  AdminRouter = "AdminRouter",
  AdminView = "AdminView"
}
export type TagTypes = keyof typeof TagType

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL,
    mode: "cors",
    credentials: "include",
    prepareHeaders: async (headers, api) => {
      headers.set("access-control-allow-origin","*")
      const token = (api.getState() as RootState).adminUser?.token
      if (token) headers.set('token', token)
      return headers
    },
  }),
  tagTypes: [TagType.AdminUser, TagType.AdminRouter, TagType.AdminView],
  endpoints: (_) => ({})
})

