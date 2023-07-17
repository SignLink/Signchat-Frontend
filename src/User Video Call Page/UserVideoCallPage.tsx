import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../Main Components/UserNavigation";
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
import { useSelector, useDispatch } from "react-redux";
import LogoutModal from "../Main Components/LogoutModal";
import { setLogout } from "../Store-Redux/LogoutReducer";

export interface localTracksTypes {
  id: number;
  audioTrack: IMicrophoneAudioTrack;
  videoTrack: ICameraVideoTrack;
}

function UserVideoCallPage() {
  const localUserRef = useRef<HTMLDivElement>(null);
  const client = useRef<IAgoraRTCClient | null>(null);

  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);
  const [userCount, setUserCount] = useState<number>(1);
  const [localTrack, setLocalTrack] = useState<localTracksTypes | null>(null);
  const [activeTrack, setActiveTrack] = useState<localTracksTypes | null>(null);
  const [muteMic, setMuteMic] = useState(false);
  const [muteCam, setMuteCam] = useState(false);

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
    const localTrack = await AgoraRTC.createMicrophoneAndCameraTracks();
    await client.current?.publish(localTrack);
    setLocalTrack({
      audioTrack: localTrack[0],
      videoTrack: localTrack[1],
      id: uid,
    });
    setActiveTrack({
      audioTrack: localTrack[0],
      videoTrack: localTrack[1],
      id: uid,
    });

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
    setOpenCreateRoom(false);
    setInCall(false);
  }

  async function muteMicrophone() {
    if (localTrack?.audioTrack.muted) {
      localTrack.audioTrack.setMuted(false);
      setMuteMic(false);
    } else {
      localTrack?.audioTrack.setMuted(true);
      setMuteMic(true);
    }
  }

  async function muteCamera() {
    if (localTrack?.videoTrack.muted) {
      localTrack.videoTrack.setMuted(false);
      setMuteCam(false);
    } else {
      localTrack?.videoTrack.setMuted(true);
      setMuteCam(true);
    }
  }
  //logout state
  const logoutInitialState = useSelector(
    (state: any) => state.logout.logoutIsOpen
  );
  const dispatchLogout = useDispatch();

  return (
    <>
      {logoutInitialState && (
        <Modal onClose={() => dispatchLogout(setLogout(false))}>
          <LogoutModal />
        </Modal>
      )}
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
              leaveCall={leaveCall}
              remoteUsers={remoteUsers}
              userCount={userCount}
              uid={uid}
              localTrack={localTrack}
              setRemoteUsers={setRemoteUsers}
              activeTrack={activeTrack}
              setActiveTrack={setActiveTrack}
              muteMicrophone={muteMicrophone}
              muteCamera={muteCamera}
              muteCam={muteCam}
              muteMic={muteMic}
            />
          )}
          <VideoCallParticipants />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserVideoCallPage;
