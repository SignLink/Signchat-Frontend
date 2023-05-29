import React from "react";
import Button from "../../Main Components/Button";
import "./VideoCallPopup.css";

interface Props {
  openCall: () => void;
}

function VideoCallPopup({ openCall }: Props) {
  return (
    <>
      <div className="videocall-popup-main">
        <div className="videocall-popup-title">
          <span>Create Room</span>
        </div>
        <div className="room-name">
          <input
            type="text"
            id="name"
            placeholder="Enter Name..."
          />
          <input
            type="text"
            id="input-room-name"
            placeholder="Enter Room Name..."
          />
        </div>
        <div className="create-videocall-button-div">
          <Button buttonName="Create Video Call" create={openCall}/>
        </div>
      </div>
    </>
  );
}

export default VideoCallPopup;
