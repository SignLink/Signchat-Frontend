import React, { useState } from "react";
import mute from "../../Icons/mute-unmute.svg";
import fullscreen from "../../Icons/full-screen.svg";
import shareScreen from "../../Icons/share-screen.svg";
import noVideo from "../../Icons/no-video.svg";
import "./UserActiveVideoCall.css";
import people from "../../Icons/people.svg";
import addPeople from "../../Icons/add-user-group-woman-man.svg";
import Button from "../../Main Components/Button";

function UserActiveVideoCall() {
  const [currentPeople, setCurrentPeople] = useState(1);

  return (
    <>
      <div className="active-videocall-main">
        <div className="video-call-info">
          <span>
            <img src={people} alt="people" />
            {`${currentPeople} people`}
          </span>
          <button className="add-people-button">
            <img src={addPeople} alt="add-people" />
            Add People
          </button>
        </div>
        <div className="main-user" id="user-1">
          <h1>1</h1>
        </div>
        <div className="video-chat">
          <div className="video-call-frame" id="user-2">
            <h1>2</h1>
          </div>
          <div className="video-call-frame" id="user-3">
            <h1>3</h1>
          </div>
          <div className="video-call-frame" id="user-4">
            <h1>4</h1>
          </div>
        </div>
        <div className="videocall-buttons">
          <button className="sharescreen-button">
            <img src={shareScreen} alt="share-screen" />
          </button>
          <button>
            <img src={fullscreen} alt="full-screen" />
          </button>
          <button className="leave-button">Leave</button>
          <button>
            <img src={mute} alt="mute" />
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
