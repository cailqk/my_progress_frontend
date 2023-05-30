import { configureStore } from "@reduxjs/toolkit";

import logSlice from "./user-slice";

const store = configureStore({
  reducer: {
    user: logSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
