import { createSlice } from "@reduxjs/toolkit";
import { UID } from "agora-rtc-sdk-ng";

interface lobbyState {
  lobbyRoomName: string;
  lobbyUserName: string;
  lobbyUID: UID | null
}

const initialState: lobbyState = {
  lobbyRoomName: "",
  lobbyUserName: "",
  lobbyUID: null
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
    setLobbyUID: (state, action) => {
      state.lobbyUID = action.payload
    }
  },
});

export const { setLobbyRoomName, setLobbyUserName, setLobbyUID } = lobbySlice.actions;
export default lobbySlice.reducer;
