import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  loginIsOpen: boolean;
}

const initialState: modalState = {
  loginIsOpen: false,
};

const loginModalSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    openLogin: function (state: modalState) {
      state.loginIsOpen = true;
    },
    closeLogin: function (state: modalState) {
      state.loginIsOpen = false;
    },
  },
});

export const { openLogin, closeLogin } = loginModalSlice.actions;
export default loginModalSlice.reducer;
