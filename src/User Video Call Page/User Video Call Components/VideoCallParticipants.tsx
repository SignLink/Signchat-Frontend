import React from "react";
import "./VideoCallParticipants.css";
import line from "../../Images/Line.svg";
import profile from "../../Icons/male-user.svg";
import mute from "../../Icons/mute-unmute.svg";

function VideoCallParticipants() {
  const participantsLists = [
    {
      name: "Deborah Smith",
    },
    {
      name: "Deborah Smith",
    },
    {
      name: "Deborah Smith",
    },
    {
      name: "Deborah Smith",
    },
    {
      name: "Deborah Smith",
    },
    {
      name: "Deborah Smith",
    },
    {
      name: "Deborah Smith",
    },
    {
      name: "Deborah Smith",
    },
    {
      name: "Deborah Smith",
    },
    {
      name: "Deborah Smith",
    },
    {
      name: "Deborah Smith",
    },
  ];
  return (
    <div className="videocall-participants-main">
      <div className="participants">
        <div className="participants-title">
          <h2>Participants</h2>
          <button>View All</button>
        </div>
        <div className="participants-lists">
          {participantsLists.map(function (names, index) {
            return (
              <div key={index}>
                <img src={profile} alt="profile-pic" />
                <div>
                  <span>{names.name}</span>
                  <button>
                    <img src={mute} alt="mute-button" />
                  </button>
                </div>
              </div>
            );
          })}
          <div></div>
        </div>
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
