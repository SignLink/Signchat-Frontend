import React, { useState } from "react";
import muteIcon from "../../Icons/mute-unmute.svg";
import noVideo from "../../Icons/no-video.svg";
import "./UserActiveVideoCall.css";
import people from "../../Icons/people.svg";
import addPeople from "../../Icons/add-user-group-woman-man.svg";
import { AgoraVideoPlayer } from "agora-rtc-react";
import { localTracksTypes } from "../UserVideoCallPage";
interface Props {
  leaveCall: () => void;
  remoteUsers: any[];
  userCount: number;
  uid: number;
  localTrack: localTracksTypes | null;
  setRemoteUsers: React.Dispatch<React.SetStateAction<any>>;
  activeTrack: any;
  setActiveTrack: React.Dispatch<any>;
}

function UserActiveVideoCall({
  leaveCall,
  remoteUsers,
  userCount,
  localTrack,
  uid,
  setRemoteUsers,
  activeTrack,
  setActiveTrack
}: Props) {
  //Function to handle clicking on a remote user's video player
  let peopleOrPerson = userCount === 1 ? "Person" : "People";

  return (
    <>
      <div className="active-videocall-main">
        <div className="video-call-info">
          <span>
            <img src={people} alt="people" />
            {`${userCount + " " + peopleOrPerson}`}
          </span>
          <button className="add-people-button">
            <img src={addPeople} alt="add-people" />
            Add People
          </button>
        </div>
        <div className="main-user" id="main-user">
          {activeTrack && (
            <div className="main-user-video-player">
              <AgoraVideoPlayer
                videoTrack={activeTrack?.videoTrack}
                key={activeTrack.id}
                style={{ width: "100%", height: "100%" }}
              />
              <div className="video-call-subtitles"><span> I love subtitles yay</span></div>
            </div>
          )}
        </div>
        <div className="video-chat">
          {remoteUsers.length > 0 &&
            remoteUsers.map(function (remoteUser, index) {
              if (remoteUser.videoTrack) {
                return (
                  <div
                    className="user-video-player"
                    key={index}
                    onClick={() => {
                      setRemoteUsers((prev: any) =>
                        prev.filter((_user: any) => _user.id !== remoteUser.id)
                      );
                      setRemoteUsers((prev: any) => [...prev, activeTrack]); // Add the activeTrack to remoteUsers
                      setActiveTrack(remoteUser); // Update the activeTrack
                    }}
                  >
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
          <button>
            <img src={muteIcon} alt="mute" />
          </button>
          <button className="leave-button" onClick={leaveCall}>
            Leave
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
