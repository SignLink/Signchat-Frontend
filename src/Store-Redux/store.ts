import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ModalReducer from "./ModalReducer";
import SignupReducer from "./SignupReducer";
import LoginReducer from "./LoginReducer";
import NotificationReducer from "./NotificationReducer";
import AuthReducer from "./AuthReducer";
import LogoutReducer from "./LogoutReducer";
import LobbyReducer from "./LobbyReducer";

const reducers = combineReducers({
  modal: ModalReducer,
  signup: SignupReducer,
  login: LoginReducer,
  notification: NotificationReducer,
  authentication: AuthReducer,
  logout: LogoutReducer,
  lobby: LobbyReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
