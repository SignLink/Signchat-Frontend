import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ModalReducer from "./ModalReducer";
import SignupReducer from "./SignupReducer";
import LoginReducer from "./LoginReducer";

const reducers = combineReducers({
  modal: ModalReducer,
  signup: SignupReducer,
  login: LoginReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
