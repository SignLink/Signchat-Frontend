import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ModalReducer from "./ModalReducer";
import SignupReducer from "./SignupReducer";
import LoginReducer from "./LoginReducer";
import NotificationReducer from "./NotificationReducer";

const reducers = combineReducers({
  modal: ModalReducer,
  signup: SignupReducer,
  login: LoginReducer,
  notification: NotificationReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
