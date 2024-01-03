import { createSlice } from "@reduxjs/toolkit";

interface authState {
  token: string | null;
  userIsLoggedIn: boolean;
  userInfo: string | null
}

const initialToken = localStorage.getItem("token");
const initialState: authState = {
  token: initialToken,
  userIsLoggedIn: false,
  userInfo: ''
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
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setToken, setUserIsLoggedIn, setUserInfo} = authSlice.actions;

export default authSlice.reducer;
