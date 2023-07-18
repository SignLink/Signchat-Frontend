import { createSlice } from "@reduxjs/toolkit";

interface lobbyState {
  lobbyRoomName: string;
  lobbyUserName: string;
}

const initialState: lobbyState = {
  lobbyRoomName: "",
  lobbyUserName: "",
};

const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    setLobbyRoomName: (state, action) => {
      state.lobbyRoomName = action.payload;
    },
    setLobbyUserName: (state, action) => {
      state.lobbyUserName = action.payload;
    },
  },
});

export const { setLobbyRoomName, setLobbyUserName } = lobbySlice.actions;
export default lobbySlice.reducer;
