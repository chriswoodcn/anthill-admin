import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
// slice
import adminSettingSlice from "@/store/slices/admin.settingSlice";
import adminUserSlice from "@/store/slices/admin.userSlice";

// RTK query
import { adminApi } from "./services/admin.api"

const rootReducer = combineReducers({
  adminSetting: adminSettingSlice,
  adminUser: adminUserSlice,
  // RTK query
  [adminApi.reducerPath]: adminApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV == "development" ? true : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 禁用序列化检查
    })
      // RTK query
      .concat(adminApi.middleware)
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
