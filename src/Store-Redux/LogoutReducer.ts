import { createSlice } from "@reduxjs/toolkit";

interface logoutState {
  logoutIsOpen: boolean;
}

const initialState: logoutState = {
  logoutIsOpen: false,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    setLogout: (state, action) => {
      state.logoutIsOpen = action.payload;
    },
  },
});

export const { setLogout } = logoutSlice.actions;
export default logoutSlice.reducer;
