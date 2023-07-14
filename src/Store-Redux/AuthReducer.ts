import { createSlice } from "@reduxjs/toolkit";

interface authState {
  token: string;
  userIsLoggedIn: boolean;
  userLogin: (token: string) => void;
  userLogout: () => void;
}

const initialState: authState = {
  token: "",
  userIsLoggedIn: false,
  userLogin(token) {},
  userLogout() {},
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
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
    setUserLogout: (state, action) => {
      state.userLogout = action.payload;
    },
  },
});

export const { setToken, setUserIsLoggedIn, setUserLogin, setUserLogout } =
  authSlice.actions;

export default authSlice.reducer;
