import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";
import UserVideoCall from "./User Video Call Components/UserVideoCall";
import "./UserVideoCallPage.css";
import VideoCallParticipants from "./User Video Call Components/VideoCallParticipants";
import { useState, useRef } from "react";
import VideoCallPopup from "./User Video Call Components/VideoCallPopup";
import Modal from "../Main Components/Modal";
import UserActiveVideoCall from "./User Video Call Components/UserActiveVideoCall";
import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";
import { appId, channelName, token } from "../Agora/Settings";

interface localTracksTypes {
  audioTrack: IMicrophoneAudioTrack | null;
  videoTrack: ICameraVideoTrack | null;
}

function UserVideoCallPage() {
  const localUserRef = useRef<HTMLDivElement>(null);
  const remoteUserRef = useRef<HTMLDivElement | null>(null);
  const mainLocalUserRef = useRef<HTMLDivElement | null>(null);
  const mainRemoteUserRef = useRef<HTMLDivElement | null>(null);
  const client = useRef<IAgoraRTCClient | null>(null);

  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);
  const [userCount, setUserCount] = useState<number>(1);

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
    client.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    await client.current?.join(appId, roomId, token, uid);
    if (localUserRef.current) {
      localUserRef.current.id = uid.toString();
    }
    localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
    mainLocalUserRef.current?.appendChild(localUserRef.current!);
    await client.current?.publish([
      localTracks.audioTrack,
      localTracks.videoTrack,
    ]);
    localTracks.videoTrack.play(localUserRef.current!);
    client.current?.on("user-published", handleUserJoined);
    client.current?.on("user-unpublished", handleUserUnpublished);
    client.current?.on("user-left", handleUserLeft);
  }

  async function handleUserJoined(
    user: IAgoraRTCRemoteUser | any,
    mediaType: any
  ) {
    await client.current?.subscribe(user, mediaType);
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
    setUserCount((prevCount) => prevCount + 1);
  }

  async function handleUserUnpublished(
    user: IAgoraRTCRemoteUser,
    mediaType: any
  ) {
    if (mediaType === "audio") {
      if (user.audioTrack) user.audioTrack.stop();
    }
    if (mediaType === "video") {
      setRemoteUsers((prevUsers) =>
        prevUsers.filter((remoteUser) => remoteUser.id !== user.uid.toString())
      );
    }
  }

  async function handleUserLeft(user: IAgoraRTCRemoteUser) {
    setRemoteUsers((prevUsers) =>
      prevUsers.filter((remoteUser) => remoteUser.id !== user.uid.toString())
    );
    setUserCount((prevCount) => prevCount - 1);
  }
  async function leaveCall() {
    await client.current?.leave();
    client.current?.removeAllListeners();
    localTracks.videoTrack?.close();
    localTracks.audioTrack?.close();
    setOpenCreateRoom(false);
    setInCall(false);
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
              localUserRef={localUserRef}
              remoteUserRef={remoteUserRef}
              mainLocalUserRef={mainLocalUserRef}
              mainRemoteUserRef={mainRemoteUserRef}
              leaveCall={leaveCall}
              remoteUsers={remoteUsers}
              userCount={userCount}
            />
          )}
          <VideoCallParticipants />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserVideoCallPage;
