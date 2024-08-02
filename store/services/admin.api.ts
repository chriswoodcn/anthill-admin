import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export enum TagType {
  AdminUser = "AdminUser",
  AdminRouter = "AdminRouter",
  AdminView = "AdminView"
}
export type TagTypes = keyof typeof TagType

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: async (headers, { getState }) => {
      //@ts-ignore
      const token = await getState()?.user?.token
      if (token) headers.set('token', token)
      return headers
    },
  }),
  tagTypes: [TagType.AdminUser, TagType.AdminRouter, TagType.AdminView],
  endpoints: (builder) => ({
    getPokemonByName: builder.query<string, void>({
      query: () => `pokemon`,
      providesTags: [TagType.AdminUser]
    }),
  })
})

