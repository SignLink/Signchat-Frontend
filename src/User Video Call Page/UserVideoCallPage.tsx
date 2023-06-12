import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";
import UserVideoCall from "./User Video Call Components/UserVideoCall";
import "./UserVideoCallPage.css";
import VideoCallParticipants from "./User Video Call Components/VideoCallParticipants";
import { useState, useEffect, useRef } from "react";
import VideoCallPopup from "./User Video Call Components/VideoCallPopup";
import Modal from "../Main Components/Modal";
import UserActiveVideoCall from "./User Video Call Components/UserActiveVideoCall";
import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
} from "agora-rtc-sdk-ng";
import { appId, channelName, token } from "../Agora/Settings";

interface localTracksTypes {
  audioTracks: IMicrophoneAudioTrack | null;
  videoTracks: ICameraVideoTrack | null;
}

function UserVideoCallPage() {
  const client = useRef<IAgoraRTCClient>(null);
  const localUserRef = useRef<HTMLDivElement>(null);
  const remoteUserRef = useRef<HTMLDivElement | null>(null);
  const mainLocalUserRef = useRef<HTMLDivElement | null>(null);
  const mainRemoteUserRef = useRef<HTMLDivElement | null>(null);

  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [inCall, setInCall] = useState(false);

  const localTracks: localTracksTypes = {
    audioTracks: null,
    videoTracks: null,
  };

  function openStartVideoCall() {
    setOpenCreateRoom(true);
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let roomId: any = urlParams.get("room");

  if (!roomId) {
    roomId = channelName;
  }
  let uid = 0;


  async function joinCall() {
    if (localUserRef.current) {
      localUserRef.current.id = uid.toString();
    }
    await client.current?.join(appId, roomId, token, uid);
    localTracks.audioTracks = await AgoraRTC.createMicrophoneAudioTrack();
    localTracks.videoTracks = await AgoraRTC.createCameraVideoTrack();
    mainLocalUserRef.current?.appendChild(localUserRef.current!);
    await client.current?.publish([
      localTracks.audioTracks,
      localTracks.videoTracks,
    ]);
    localTracks.videoTracks.play(localUserRef.current!);
    console.log("publish success!");

    client.current?.on("user-published", handleUserJoined);
  }

  async function handleUserJoined(user: any, mediaType: any) {
    console.log("user has joined stream");
  }

  return (
    <>
      {openCreateRoom && (
        <Modal onClose={() => setOpenCreateRoom(false)}>
          <VideoCallPopup
            openCall={() => {
              setInCall(true);
              setOpenCreateRoom(false);
              joinCall();
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
            <UserActiveVideoCall
              closeVideo={setInCall}
              localUserRef={localUserRef}
              remoteUserRef={remoteUserRef}
              mainLocalUserRef={mainLocalUserRef}
            />
          )}
          <VideoCallParticipants />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserVideoCallPage;
