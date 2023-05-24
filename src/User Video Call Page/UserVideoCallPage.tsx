import React from "react";
import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";
import UserVideoCall from "./User Video Call Components/UserVideoCall";
import './UserVideoCallPage.css'
import VideoCallParticipants from "./User Video Call Components/VideoCallParticipants";

function UserVideoCallPage() {
  return (
    <MainWrapper>
      <div className="user-videocall-main">
        <UserNavigation />
        <UserVideoCall/>
        <VideoCallParticipants/>
      </div>
    </MainWrapper>
  );
}

export default UserVideoCallPage;
