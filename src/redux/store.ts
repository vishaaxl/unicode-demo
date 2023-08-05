import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/form.slice";

export const store = configureStore({
  reducer: {
    formReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
