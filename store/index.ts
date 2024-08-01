import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingSlice from "@/store/slices/settingSlice";

const rootReducer = combineReducers({
  setting: settingSlice,
});

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV == "development" ? true : false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, // 禁用序列化检查
  })
});

export type IRootState = ReturnType<typeof rootReducer>;
