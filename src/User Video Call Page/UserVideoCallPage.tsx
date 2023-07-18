import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../Main Components/UserNavigation";
import UserVideoCall from "./User Video Call Components/UserVideoCall";
import "./UserVideoCallPage.css";
import VideoCallParticipants from "./User Video Call Components/VideoCallParticipants";
import { useState, useRef, useEffect } from "react";
import VideoCallPopup from "./User Video Call Components/VideoCallPopup";
import Modal from "../Main Components/Modal";
import UserActiveVideoCall from "./User Video Call Components/UserActiveVideoCall";
import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IAgoraRTCRemoteUser,
  UID,
} from "agora-rtc-sdk-ng";
import { appId, token } from "../Agora/Settings";
import { useSelector, useDispatch } from "react-redux";
import LogoutModal from "../Main Components/LogoutModal";
import { setLogout } from "../Store-Redux/LogoutReducer";
import { useNavigate } from "react-router";
import { join } from "path";

export interface localTracksTypes {
  id: UID;
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

  const navigate = useNavigate();
  const lobbyRoomName = useSelector((state: any) => state.lobby.lobbyRoomName);

  function openStartVideoCall() {
    setOpenCreateRoom(true);
  }
  //room
  const lobbyRoom = useSelector((state: any) => state.lobby.lobbyRoomName);

  let uid: UID | any;

  useEffect(() => {
    client.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    client.current?.on("user-published", handleUserJoined);
    client.current?.on("user-unpublished", handleUserUnpublished);
    client.current?.on("user-left", handleUserLeft);
  }, []);

  async function joinCall() {
    uid = await client.current?.join(appId, lobbyRoom, token, null);
    
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
  }

  async function handleUserJoined(
    user: IAgoraRTCRemoteUser | any,
    mediaType: any
  ) {
    await client.current?.subscribe(user, mediaType);
    if (mediaType === "video") {
      const newUser = {
        id: user.uid,
        videoTrack: user.videoTrack,
        audioTrack: user.audioTrack,
      };
      setRemoteUsers((prevUsers) => [...prevUsers, newUser]);

      user.videoTrack.play();
    }
    if (mediaType === "audio") {
      const newUser = {
        id: user.uid,
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
    localTrack?.audioTrack.stop();
    localTrack?.videoTrack.stop();
    await client.current?.leave();
    client.current?.removeAllListeners();
    setOpenCreateRoom(false);
    setInCall(false);
    navigate("/videocall");
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
              navigate(`/videocall?room=${lobbyRoomName}`);
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
