import React from "react";
import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../Main Components/UserNavigation";
import UserSettings from "./User Settings Components/UserSettings";
import "./UserSettingsPage.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Main Components/Modal";
import { setLogout } from "../Store-Redux/LogoutReducer";
import LogoutModal from "../Main Components/LogoutModal";
import Notification from "../Main Components/Notification";

function UserSettingsPage() {
  const logoutInitialState = useSelector(
    (state: any) => state.logout.logoutIsOpen
  );
  const dispatchLogout = useDispatch();
 
  return (
    <>
      {logoutInitialState && (
        <Modal onClose={() => dispatchLogout(setLogout(false))}>
          <LogoutModal />
        </Modal>
      )}
      <MainWrapper>
        <div className="user-settings-main">
          <UserNavigation />
          <UserSettings />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserSettingsPage;
