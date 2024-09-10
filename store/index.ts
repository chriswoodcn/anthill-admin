import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import { rememberReducer, rememberEnhancer } from 'redux-remember';
// slice
import adminSettingSlice from "@/store/slices/admin.settingSlice";
import adminUserSlice from "@/store/slices/admin.userSlice";
import adminRouterSlice from './slices/admin.routerSlice';
import { isBrowser } from '@/lib';

const rootReducer = {
  adminSetting: adminSettingSlice,
  adminUser: adminUserSlice,
  adminRouter: adminRouterSlice,
}
// 只需要持久化adminSetting和adminRouter
const rememberedKeys = ['adminRouter', 'adminSetting'];
const rememberedRootReducer = rememberReducer(rootReducer);

export const store = configureStore({
  reducer: rememberedRootReducer,
  devTools: process.env.NODE_ENV == "development" ? true : false,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
    rememberEnhancer(
      window.localStorage,
      rememberedKeys
    )
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 禁用序列化检查
    })
});

export const makeStore = () => store

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
