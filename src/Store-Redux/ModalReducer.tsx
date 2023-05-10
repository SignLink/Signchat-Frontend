import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  modalIsOpen: boolean;
}

const initialState: modalState = {
  modalIsOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: function (state: modalState) {
      state.modalIsOpen = true;
    },
    closeModal: function (state: modalState) {
      state.modalIsOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
