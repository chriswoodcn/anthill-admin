import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingConfigSlice from "@/store/settingConfigSlice";

const rootReducer = combineReducers({
  settingConfig: settingConfigSlice,
});

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV == "development" ? true : false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, // 禁用序列化检查
  })
});

export type IRootState = ReturnType<typeof rootReducer>;
