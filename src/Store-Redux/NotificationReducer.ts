import { createSlice } from "@reduxjs/toolkit";
import check from "../Icons/icons8-ok.svg";

interface notificationStates {
  notificationIsOpen: boolean;
  notificationBorderColor: string;
  notificationBackgroundColor: string;
  notificationIcon: any;
  notificationTextColor: string;
  notificationMessage: string;
}

const initialState: notificationStates = {
  notificationIsOpen: false,
  notificationBorderColor: "#008000",
  notificationBackgroundColor: "#c8ffc8",
  notificationIcon: check,
  notificationTextColor: "#008000",
  notificationMessage: "No Message",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setShowNotification: (state, action) => {
      state.notificationIsOpen = action.payload;
    },
    setNotificationBorderColor: (state, action) => {
      state.notificationBorderColor = action.payload;
    },
    setNotificationBackgroundColor: (state, action) => {
      state.notificationBackgroundColor = action.payload;
    },
    setNotificationIcon: (state, action) => {
      state.notificationIcon = action.payload;
    },
    setNotificationTextColor: (state, action) => {
      state.notificationTextColor = action.payload;
    },
    setNotificationMessage: (state, action) => {
      state.notificationMessage = action.payload;
    },
  },
});

export const {
  setShowNotification,
  setNotificationBorderColor,
  setNotificationBackgroundColor,
  setNotificationIcon,
  setNotificationTextColor,
  setNotificationMessage,
} = notificationSlice.actions;
export default notificationSlice.reducer;
