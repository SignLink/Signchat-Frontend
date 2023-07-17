import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface authState {
  token: string | null;
  userIsLoggedIn: boolean;
  autoLogOut: boolean;
  autoLogoutTimer: NodeJS.Timeout | null;
}

const initialToken = localStorage.getItem("token");
const initialState: authState = {
  token: initialToken,
  userIsLoggedIn: false,
  autoLogOut: false,
  autoLogoutTimer: null,
};


const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserIsLoggedIn: (state, action) => {
      state.userIsLoggedIn = action.payload;
    },
    setAutoLogout: (state, action) => {
      state.autoLogOut = action.payload;
    },
    setAutoLogoutTimer: (state, action) => {
      state.autoLogoutTimer = action.payload
    }
  },
});

export const { setToken, setUserIsLoggedIn, setAutoLogout, setAutoLogoutTimer } = authSlice.actions;

export default authSlice.reducer;
