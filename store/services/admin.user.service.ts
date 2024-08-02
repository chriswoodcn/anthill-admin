import { adminApi, TagType } from './admin.api';

export const AdminUserService = adminApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: ({ body }) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        TagType.AdminUser,
        TagType.AdminRouter,
        TagType.AdminView,
      ],
    }),
  })
})
export const { useLoginMutation } = AdminUserService
