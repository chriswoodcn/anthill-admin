import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
interface UserState {
  token?: string
}
const initialState: UserState = {

  token: Cookies.get('authorization') || ''
}

const userSlice = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {
    adminUserLogout: state => {
      Cookies.remove('authorization')
      state.token = ''
    },

    adminUserLogin: (state, action) => {
      Cookies.set('authorization', action.payload, { expires: 14 })
      state.token = action.payload
    },
  },
})

export const { adminUserLogout, adminUserLogin } = userSlice.actions

export default userSlice.reducer
