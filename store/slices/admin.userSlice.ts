import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
interface UserState {
  userInfo?: Record<string, any>,
  token?: string
}
const initialState: UserState = {
  userInfo: {},
  token: Cookies.get('authorization') || ''
}

const userSlice = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {
    clearToken: state => {
      state.token = ''
    },

    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload || ''
    },

    clearUserInfo: state => {
      state.userInfo = {}
    },

    setUserInfo: (state, action: PayloadAction<Record<string, any> | undefined>) => {
      state.userInfo = action.payload || {}
    },

    clearAdminUserState: state => {
      clearToken()
      clearUserInfo()
    },
  },
})

export const { setToken, clearToken, setUserInfo, clearUserInfo, clearAdminUserState } = userSlice.actions

export default userSlice.reducer
