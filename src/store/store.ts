import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ModalReducer from "./reducers/ModalReducer";
import SignupReducer from "./reducers/SignupReducer";
import LoginReducer from "./reducers/LoginReducer";
import NotificationReducer from "./reducers/NotificationReducer";
import AuthReducer from "./reducers/AuthReducer";
import LogoutReducer from "./reducers/LogoutReducer";
import LobbyReducer from "./reducers/LobbyReducer";

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
