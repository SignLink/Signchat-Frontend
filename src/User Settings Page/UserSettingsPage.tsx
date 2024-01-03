import React from "react";
import MainWrapper from "../components/MainWrapper";
import UserNavigation from "../components/UserNavigation";
import UserSettings from "./User Settings Components/UserSettings";
import "./UserSettingsPage.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import { setLogout } from "../Store-Redux/LogoutReducer";
import LogoutModal from "../components/LogoutModal";
import Notification from "../components/Notification";

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
