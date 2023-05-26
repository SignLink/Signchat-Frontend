import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";
import UserVideoCall from "./User Video Call Components/UserVideoCall";
import "./UserVideoCallPage.css";
import VideoCallParticipants from "./User Video Call Components/VideoCallParticipants";
import { useState } from "react";
import VideoCallPopup from "./User Video Call Components/VideoCallPopup";
import Modal from "../Main Components/Modal";

function UserVideoCallPage() {
  const [openCreateRoom, setOpenCreateRoom] = useState(false);

  function openStartVideoCall(){
    setOpenCreateRoom(true)
  }

  return (
    <>
      {openCreateRoom && (
        <Modal>
          <VideoCallPopup />
        </Modal>
      )}
      <MainWrapper>
        <div className="user-videocall-main">
          <UserNavigation />
          <UserVideoCall openCreateVideoCall={openStartVideoCall} />
          <VideoCallParticipants />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserVideoCallPage;
