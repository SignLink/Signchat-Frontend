import React from "react";
import MainWrapper from "../components/MainWrapper";
import UserNavigation from "../components/UserNavigation";
import "./UserSchedulePage.css";
import UserSchedule from "./User Schedule Components/UserSchedule";
import Modal from "../components/Modal";
import LogoutModal from "../components/LogoutModal";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../Store-Redux/LogoutReducer";

function UserSchedulePage() {
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
        <div className="user-schedule-page-main">
          <UserNavigation />
          <UserSchedule />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserSchedulePage;
