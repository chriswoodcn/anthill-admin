// import apiSlice from './admin.api'

// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: builder => ({
//     login: builder.mutation<Record<string, any>, Record<string, any>>({
//       query: ({ body }) => ({
//         url: '/api/auth/login',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: [
//         'AdminUser',
//       ],
//     }),
//   })
// })
// export const {
//   useLoginMutation
// } = userApiSlice

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface Pokemon {
  name: string
  email?: string
}

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
