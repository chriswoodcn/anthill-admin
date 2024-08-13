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
    setToken: state => {
      state.token = ''
    },

    clearToken: (state, action) => {
      state.token = action.payload
    },
  },
})

export const { setToken, clearToken } = userSlice.actions

export default userSlice.reducer
