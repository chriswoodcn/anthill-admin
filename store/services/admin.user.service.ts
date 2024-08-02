import { adminApi, TagType } from './admin.api';

export const AdminUserService = adminApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: ({ body }) => ({
        url: '/backend/login',
        method: 'post',
        body: {
          device: "WEB",
          ...body
        },
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
