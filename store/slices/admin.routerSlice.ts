import { flatMenuTree2MenuList, Menu } from '@/lib/menu';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';

export interface RouterState {
  userRouterTree: Menu[],
  userRouterList: Menu[],
  userRouterMD5: string | undefined,
}
const initialState: RouterState = {
  userRouterTree: [],
  userRouterList: [],
  userRouterMD5: undefined
};
const routerSlice = createSlice({
  name: 'adminRouter',
  initialState: initialState,
  reducers: {
    setUserRouter: (state, action: PayloadAction<Menu[]>) => {
      if (action.payload.length > 0) {
        const nowMD5 = CryptoJS.MD5(JSON.stringify(action.payload)).toString();
        if (nowMD5 != state.userRouterMD5) {
          state.userRouterMD5 = nowMD5
          state.userRouterTree = action.payload
          state.userRouterTree = flatMenuTree2MenuList(action.payload)
        }
      }
    },
  }
});

export const { } = routerSlice.actions

export default routerSlice.reducer;
