import { createSlice } from "@reduxjs/toolkit";

interface authState {
  token: string;
  userIsLoggedIn: boolean;
}

const initialState: authState = {
  token: "",
  userIsLoggedIn: false,
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
  },
});

export const { setToken, setUserIsLoggedIn} =
  authSlice.actions;

export default authSlice.reducer;
