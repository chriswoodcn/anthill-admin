import { flatMenuTree2MenuList, Menu } from '@/lib/menu';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';

export interface RouterState {
  userRouterTree: Menu[],
  userRouterList: Menu[],
  userRouterMD5: string | undefined,
}
const initialRouter: Menu[] = [{ menuType: 'C', path: '/admin/index', menuKey: 'admin-home', icon: 'admin-home' }];
const initialState: RouterState = {
  userRouterTree: initialRouter,
  userRouterList: initialRouter,
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
          const menus = [...initialRouter, ...action.payload]
          state.userRouterTree = menus;
          state.userRouterList = flatMenuTree2MenuList(menus)
        }
      }
    },
    clearUserRouter: (state) => {
      state.userRouterMD5 = undefined
      state.userRouterTree = initialRouter;
      state.userRouterList = initialRouter;
    }
  }
});

export const { setUserRouter, clearUserRouter } = routerSlice.actions

export default routerSlice.reducer;
