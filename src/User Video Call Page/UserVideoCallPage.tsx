import React from "react";
import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";
import UserVideoCall from "./User Video Call Components/UserVideoCall";
import './UserVideoCallPage.css'

function UserVideoCallPage() {
  return (
    <MainWrapper>
      <div className="user-videocall-main">
        <UserNavigation />
        <UserVideoCall/>
      </div>
    </MainWrapper>
  );
}

export default UserVideoCallPage;
