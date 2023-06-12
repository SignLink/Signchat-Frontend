import React, { useState, useEffect, useRef } from "react";
import muteIcon from "../../Icons/mute-unmute.svg";
import fullscreen from "../../Icons/full-screen.svg";
import shareScreen from "../../Icons/share-screen.svg";
import noVideo from "../../Icons/no-video.svg";
import "./UserActiveVideoCall.css";
import people from "../../Icons/people.svg";
import addPeople from "../../Icons/add-user-group-woman-man.svg";
import { AgoraVideoPlayer } from "agora-rtc-react";
interface Props {
  closeVideo: React.Dispatch<React.SetStateAction<boolean>>;
  localUserRef: React.MutableRefObject<HTMLDivElement | null>;
  remoteUserRef: React.MutableRefObject<HTMLDivElement | null>;
  mainLocalUserRef: React.MutableRefObject<HTMLDivElement | null>;
  mainRemoteUserRef: React.MutableRefObject<HTMLDivElement | null>;
  leaveCall: () => void;
  remoteUsers: any[];
}

function UserActiveVideoCall({
  closeVideo,
  localUserRef,
  remoteUserRef,
  mainLocalUserRef,
  mainRemoteUserRef,
  leaveCall,
  remoteUsers,
}: Props) {
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
        <div className="main-user" id="main-user" ref={mainLocalUserRef}>
          <div className="main-user-video-player" ref={localUserRef}></div>
        </div>
        <div className="video-chat" ref={mainRemoteUserRef}>
          {remoteUsers.length > 0 &&
            remoteUsers.map(function (remoteUser, index) {
              if (remoteUser.videoTrack) {
                return (
                  <div className="user-video-player" key={index}>
                    <AgoraVideoPlayer
                      videoTrack={remoteUser.videoTrack}
                      key={remoteUser.id}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                );
              }
              return null;
            })}
        </div>
        <div className="videocall-buttons">
          <button className="sharescreen-button">
            <img src={shareScreen} alt="share-screen" />
          </button>
          <button>
            <img src={fullscreen} alt="full-screen" />
          </button>
          <button className="leave-button" onClick={leaveCall}>
            Leave
          </button>
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
