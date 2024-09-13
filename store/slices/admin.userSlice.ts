import { getAuthorizationInfoClient } from '@/lib/jwt'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  userInfo: Record<string, any>,
  token: string
  permissions: string[]
  roles: string[]
}
/**
 * 每当初始化一次页面的时候都需要从nextjs的cookie中解析出用户信息，再存到redux中，这样刷新浏览器页面不会丢失redux中的用户信息
 * 这里不使用本地存储以防篡改本地信息
 */
const getUserInfo = () => {
  const payload = getAuthorizationInfoClient();
  if (payload) {
    return payload
  } else {
    return undefined
  }
}
const initialState: UserState = {
  userInfo: getUserInfo() == undefined ? {} : (getUserInfo() as any).userInfo,
  token: getUserInfo() == undefined ? '' : (getUserInfo() as any).token,
  permissions: getUserInfo() == undefined ? [] : (getUserInfo() as any).permissions,
  roles: getUserInfo() == undefined ? [] : (getUserInfo() as any).roles,
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
