import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: async (headers, { getState }) => {
      //@ts-ignore
      const token = await getState()?.user?.token
      if (token) headers.set('token', token)
      return headers
    },
  }),
  tagTypes: ['AdminUser',],
  endpoints: builder => ({}),
})

export default apiSlice
