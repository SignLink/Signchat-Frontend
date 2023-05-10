import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ModalReducer from "./ModalReducer";
import SignupReducer from "./SignupReducer";

const reducers = combineReducers({
    modal: ModalReducer,
    signup:SignupReducer
})


const store = configureStore({
  reducer: reducers,
});

export default store;
