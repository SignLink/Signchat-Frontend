import React from "react";
import Button from "../../Main Components/Button";
import './VideoCallPopup.css'

function VideoCallPopup() {
  return (
    <>
      <div className="videocall-popup-main">
        <div className="videocall-popup-title">
          <span>Create Room</span>
        </div>
        <div className="room-name">
          <span>Room Name</span>
          <input type="text" id="input-room-name" placeholder="Enter Room Name..."/>
        </div>
        <div className="create-videocall-button-div">
          <Button buttonName="Create Video Call" />
        </div>
      </div>
    </>
  );
}

export default VideoCallPopup;
