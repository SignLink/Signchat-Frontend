import React, { useState, useEffect } from "react";
import muteIcon from "../../Icons/mute-unmute.svg";
import fullscreen from "../../Icons/full-screen.svg";
import shareScreen from "../../Icons/share-screen.svg";
import noVideo from "../../Icons/no-video.svg";
import "./UserActiveVideoCall.css";
import people from "../../Icons/people.svg";
import addPeople from "../../Icons/add-user-group-woman-man.svg";
import { useClient } from "../../Agora/Settings";
import { AgoraVideoPlayer } from "agora-rtc-react";
interface Props {
  currentUsers: number;
  tracks: any;
  setStart: any;
  setInCall: any;
  users: any[];
}

function UserActiveVideoCall() {
  const client = useClient();
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  return (
    <>
      <div className="active-videocall-main">
        <div className="video-call-info">
          <span>
            <img src={people} alt="people" />
            {`${0} people`}
          </span>
          <button className="add-people-button">
            <img src={addPeople} alt="add-people" />
            Add People
          </button>
        </div>
        <div className="main-user" id="user-1"></div>
        <div className="video-chat"></div>
        <div className="videocall-buttons">
          <button className="sharescreen-button">
            <img src={shareScreen} alt="share-screen" />
          </button>
          <button>
            <img src={fullscreen} alt="full-screen" />
          </button>
          <button className="leave-button">Leave</button>
          <button>
            <img src={muteIcon} alt="mute" />
          </button>
          <button>
            <img src={noVideo} alt="no-video" />
          </button>
        </div>
      </div>
    </>
  );
}

export default UserActiveVideoCall;
