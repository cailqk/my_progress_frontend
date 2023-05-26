import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name: "user",
  initialState: { loggedIn: false },
  reducers: {
    toggle(state) {
      state.loggedIn = true;
    },
    logout(state) {
        localStorage.removeItem("token");
        state.loggedIn = false;
    }
  },
});


export const logActions = logSlice.actions;
export default logSlice;
