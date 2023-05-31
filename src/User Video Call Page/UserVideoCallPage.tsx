import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";
import UserVideoCall from "./User Video Call Components/UserVideoCall";
import "./UserVideoCallPage.css";
import VideoCallParticipants from "./User Video Call Components/VideoCallParticipants";
import { useState, useEffect } from "react";
import VideoCallPopup from "./User Video Call Components/VideoCallPopup";
import Modal from "../Main Components/Modal";
import UserActiveVideoCall from "./User Video Call Components/UserActiveVideoCall";
import { useMicrophoneAndCameraTracks, useClient } from "../Agora/Settings";
import { read } from "fs";

type Person = number | any;

function UserVideoCallPage() {
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [inCall, setInCall] = useState(false);

  function openStartVideoCall() {
    setOpenCreateRoom(true);
  }

  return (
    <>
      {openCreateRoom && (
        <Modal onClose={() => setOpenCreateRoom(false)}>
          <VideoCallPopup
            openCall={() => {
              setInCall(true);
              setOpenCreateRoom(false);
            }}
          />
        </Modal>
      )}
      <MainWrapper>
        <div className="user-videocall-main">
          <UserNavigation />
          {!inCall ? (
            <UserVideoCall openCreateVideoCall={openStartVideoCall} />
          ) : (
            <UserActiveVideoCall />
          )}
          <VideoCallParticipants />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserVideoCallPage;
