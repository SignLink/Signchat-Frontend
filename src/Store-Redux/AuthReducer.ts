import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface authState {
  token: string | null;
  userIsLoggedIn: boolean;
  autoLogOut: boolean;
}

const initialToken = localStorage.getItem("token");
const initialState: authState = {
  token: initialToken,
  userIsLoggedIn: false,
  autoLogOut: false,
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
  },
});

export const { setToken, setUserIsLoggedIn, setAutoLogout} = authSlice.actions;

export default authSlice.reducer;
