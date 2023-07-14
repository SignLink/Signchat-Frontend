import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface authState {
  token: string;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const initialState: authState = {
  token: "",
  isLoggedIn: false,
  login(token) {},
  logout() {},
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setLogout: (state, action) => {
      state.logout = action.payload;
    },
  },
});

export const { setToken, setIsLoggedIn, setLogin, setLogout } =
  authSlice.actions;

export default authSlice.reducer;
