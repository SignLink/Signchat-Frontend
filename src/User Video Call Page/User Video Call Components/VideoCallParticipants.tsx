import React from "react";
import "./VideoCallParticipants.css";
import line from "../../Images/Line.svg";

function VideoCallParticipants() {
  return (
    <div className="videocall-participants-main">
      <div className="participants">
        <div className="participants-title">
          <h2>Participants</h2>
          <button>View All</button>
        </div>
        <div className="participants-lists"></div>
      </div>
      <span className="line">
        <img src={line} alt="line" />
      </span>
      <div className="videocall-chat-main">
        <div className="videocall-chat-box"></div>
        <div className="videocall-send"></div>
      </div>
    </div>
  );
}

export default VideoCallParticipants;
