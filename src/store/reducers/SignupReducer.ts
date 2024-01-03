import { createSlice } from "@reduxjs/toolkit";

interface signupState {
  signupIsOpen: boolean;
}

const initialState: signupState = {
  signupIsOpen: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    openSignup: function (state: signupState) {
      state.signupIsOpen = true;
    },
    closeSignup: function (state: signupState) {
      state.signupIsOpen = false;
    },
  },
});

export const { openSignup, closeSignup } = signupSlice.actions;
export default signupSlice.reducer;
