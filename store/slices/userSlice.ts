import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  token: Cookies.get('token') || ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      Cookies.remove('token')
      state.token = ''
    },

    login: (state, action) => {
      Cookies.set('token', action.payload, { expires: 21 })
      state.token = action.payload
    },
  },
})

export const { logout, login } = userSlice.actions

export default userSlice.reducer
