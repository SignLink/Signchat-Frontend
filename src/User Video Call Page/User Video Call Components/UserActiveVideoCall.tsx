import React, { useState, useEffect, useRef } from "react";
import muteIcon from "../../Icons/mute-unmute.svg";
import fullscreen from "../../Icons/full-screen.svg";
import shareScreen from "../../Icons/share-screen.svg";
import noVideo from "../../Icons/no-video.svg";
import "./UserActiveVideoCall.css";
import people from "../../Icons/people.svg";
import addPeople from "../../Icons/add-user-group-woman-man.svg";
import { channelName, appId, token } from "../../Agora/Settings";
import AgoraRTC from "agora-rtc-sdk-ng";
interface Props {
  closeVideo: any;
}

interface localtracksTypes {
  audioTracks: any;
  videoTracks: any;
}

function UserActiveVideoCall({ closeVideo }: Props) {
  let userPlayer = useRef<HTMLDivElement>(null);

  let localTracks: localtracksTypes = {
    audioTracks: null,
    videoTracks: null,
  };
  let remoteUsers = {};
  let uid: any;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let roomId: any = urlParams.get("room");

  if (!roomId) {
    roomId = channelName;
  }

  let client: any;
  
  let joinRoomInit =async () => {
    client = await AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    joinStream()
  }

  let joinStream = async () => {
    
    // Join the new channel and create local tracks
    [uid, localTracks.audioTracks, localTracks.videoTracks] = await Promise.all(
      [
        client.join(appId, roomId, token),
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack(),
      ]
    );

    let videoPlayer = `<div class="video-call-frame" id="user-container-${uid}">
         <div class="user-video-player" id="user-${uid}"></div>
       </div>`;

    userPlayer.current?.insertAdjacentHTML("beforeend", videoPlayer);

    localTracks.videoTracks.play(`user-${uid}`);

    await client.publish([localTracks.audioTracks, localTracks.videoTracks]);
  };
  joinRoomInit()

  async function leaveChannel() {}
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
        <div className="main-user" id="main-user-1"></div>
        <div className="video-chat" ref={userPlayer}>
          {/* <div className="video-call-frame" id={`user-container-1`}>
            <div className="user-video-player" id={`user-1`}></div>
          </div> */}
        </div>
        <div className="videocall-buttons">
          <button className="sharescreen-button">
            <img src={shareScreen} alt="share-screen" />
          </button>
          <button>
            <img src={fullscreen} alt="full-screen" />
          </button>
          <button className="leave-button" onClick={leaveChannel}>
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
