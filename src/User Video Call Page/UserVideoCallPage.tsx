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
import { appId, channelName, token, client } from "../Agora/Settings";

interface localTracksTypes {
  audioTrack: IMicrophoneAudioTrack | null;
  videoTrack: ICameraVideoTrack | null;
}

function UserVideoCallPage() {
  const localUserRef = useRef<HTMLDivElement>(null);
  const remoteUserRef = useRef<HTMLDivElement | null>(null);
  const mainLocalUserRef = useRef<HTMLDivElement | null>(null);
  const mainRemoteUserRef = useRef<HTMLDivElement | null>(null);

  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);

  const localTracks: localTracksTypes = {
    audioTrack: null,
    videoTrack: null,
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
    await client.join(appId, roomId, token, uid);
    if (localUserRef.current) {
      localUserRef.current.id = uid.toString();
    }
    localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
    mainLocalUserRef.current?.appendChild(localUserRef.current!);
    await client.publish([localTracks.audioTrack, localTracks.videoTrack]);
    localTracks.videoTrack.play(localUserRef.current!);
    console.log("publish success for local!");
    client.on("user-published", handleUserJoined);
  }

  async function handleUserJoined(user: any, mediaType: any) {
    await client.subscribe(user, mediaType);
    console.log("publish success for remote user!");
    if (mediaType === "video") {
      const newUser = {
        id: user.uid.toString(),
        videoTrack: user.videoTrack,
        audioTrack: user.audioTrack,
      };
      setRemoteUsers((prevUsers) => [...prevUsers, newUser]);
      user.videoTrack.play();
    }
    if (mediaType === "audio") {
      const newUser = {
        id: user.uid.toString(),
        audioTrack: user.audioTrack,
      };
      setRemoteUsers((prevUsers) => [...prevUsers, newUser]);
      user.audioTrack.play();
    }

    client.on("user-unpublished", (user) => {
      console.log(user.uid + " has left the channel");
      setRemoteUsers((prevUsers) =>
        prevUsers.filter((remoteUser) => remoteUser.id !== user.uid.toString())
      );
    });
  }
  async function leaveCall() {
    localTracks.audioTrack?.close();
    localTracks.videoTrack?.close();
    await client.leave();
    await client.removeAllListeners()
    remoteUserRef.current?.remove();
    localUserRef.current?.remove();
    setOpenCreateRoom(false);
    setInCall(false);
    console.log("left Channel");
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
              mainRemoteUserRef={mainRemoteUserRef}
              leaveCall={leaveCall}
              remoteUsers={remoteUsers}
            />
          )}
          <VideoCallParticipants />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserVideoCallPage;
