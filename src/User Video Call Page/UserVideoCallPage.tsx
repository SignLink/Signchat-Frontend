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
import { RtmClient, RtmChannel } from "agora-rtm-sdk";
import AgoraRTM from "agora-rtm-sdk";

export interface localTracksTypes {
  id: UID;
  audioTrack: IMicrophoneAudioTrack;
  videoTrack: ICameraVideoTrack;
}

function UserVideoCallPage() {
  const client = useRef<IAgoraRTCClient | null>(null);
  const RTMClient = useRef<RtmClient | null>(null);
  const channel = useRef<RtmChannel | null>(null);

  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);
  const [userCount, setUserCount] = useState<number>(1);
  const [localTrack, setLocalTrack] = useState<localTracksTypes | null>(null);
  const [activeTrack, setActiveTrack] = useState<localTracksTypes | null>(null);
  const [muteMic, setMuteMic] = useState(false);
  const [muteCam, setMuteCam] = useState(false);
  const [lobbyParticipants, setLobbyParticipants] = useState<
    { participantId: string; participantName: string }[]
  >([]);
  const [channelMessage, setChannelMessage] = useState("");
  const [displayMessages, setDisplayMessages] = useState<
    { userName: string; userMessage: string }[]
  >([]);
  const [speakerId, setSpeakerId] = useState<UID | null>(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function openStartVideoCall() {
    setOpenCreateRoom(true);
  }
  //room
  const lobbyRoomName = useSelector((state: any) => state.lobby.lobbyRoomName);
  const lobbyName = useSelector((state: any) => state.lobby.lobbyUserName);

  let uid: UID | any = sessionStorage.getItem("uid");
  if (!uid) {
    uid = String(Math.floor(Math.random() * 1000));
    sessionStorage.setItem("uid", uid);
  }

  useEffect(() => {
    RTMClient.current = AgoraRTM.createInstance(appId);
    client.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    client.current?.on("user-published", handleUserJoined);
    client.current?.on("user-unpublished", handleUserUnpublished);
    client.current?.on("user-left", handleUserLeft);
  }, []);

  async function joinCall() {
    if (RTMClient.current) {
      channel.current = RTMClient.current?.createChannel(lobbyRoomName);
    }
    await RTMClient.current?.login({ uid });
    await channel.current?.join();
    await RTMClient.current?.addOrUpdateLocalUserAttributes({
      name: lobbyName,
    });

    uid = await client.current?.join(appId, lobbyRoomName, token, null);

    channel.current?.on("MemberJoined", async (memberId: string) => {
      const namePromise = await RTMClient.current?.getUserAttributesByKeys(
        memberId,
        ["name"]
      );
      if (namePromise) {
        const nameResult = await namePromise;
        setLobbyParticipants((prevParticipants) => [
          ...prevParticipants,
          { participantId: memberId, participantName: `${nameResult.name}` },
        ]);
      }
      setUserCount((prevCount) => prevCount + 1);
    });
    channel.current?.on("MemberLeft", async (memberId: string) => {
      setLobbyParticipants((prevUsers) =>
        prevUsers.filter(
          (participant) => participant.participantId !== memberId
        )
      );
    });
    getParticipants();
    channel.current?.on("ChannelMessage", async (message) => {
      if (message.text) {
        let data = JSON.parse(message.text);
        setDisplayMessages((p) => [
          ...p,
          { userName: data.displayName, userMessage: data.message },
        ]);
      }
    });

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
    //@ts-ignore
    AgoraRTC.setParameter("AUDIO_VOLUME_INDICATION_INTERVAL", 200);
    client.current?.enableAudioVolumeIndicator();
    client.current?.on("volume-indicator", (volumes) => {
      let maxVolume: number = 30;
      volumes.forEach((volume) => {
        if (volume.level > maxVolume) {
          maxVolume = volume.level;
          setSpeakerId(volume.uid)
        }
      });
    });
  }

  //trigger participant leaving the call function
  useEffect(() => {
    async function leaveChannel() {
      await channel.current?.leave();
      await RTMClient.current?.logout();
    }

    window.addEventListener("beforeunload", leaveChannel);

    // cleanup this component
    return () => {
      window.removeEventListener("beforeunload", leaveChannel);
    };
  }, []);

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
      console.log(speakerId === newUser.id);
    }
    if (mediaType === "audio") {
      const newUser = {
        id: user.uid.toString(),
        audioTrack: user.audioTrack,
      };
      setRemoteUsers((prevUsers) => [...prevUsers, newUser]);
      user.audioTrack.play();
    }
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

  async function getParticipants() {
    let members: any = await channel.current?.getMembers();
    if (members) {
      for (let i = 0; i < members.length; i++) {
        const namePromise = RTMClient.current?.getUserAttributesByKeys(
          members[i],
          ["name"]
        );
        if (namePromise) {
          const nameResult = await namePromise;
          setLobbyParticipants((prev) => [
            ...prev,
            { participantId: members[i], participantName: nameResult.name },
          ]);
        }
      }
    }
  }

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (channel.current) {
      channel.current
        .sendMessage({
          text: JSON.stringify({
            type: "chat",
            message: channelMessage,
            displayName: lobbyName,
          }),
        })
        .then(() => {
          setDisplayMessages([
            ...displayMessages,
            { userName: lobbyName, userMessage: channelMessage },
          ]);
        })
        .catch((error) => {
          console.error("Failed to send message:", error);
        });
    }

    setChannelMessage("");
  }

  async function leaveCall() {
    await localTrack?.audioTrack.close();
    await localTrack?.videoTrack.close();
    client.current?.leave();
    await channel.current?.leave();
    await RTMClient.current?.logout();
    setRemoteUsers([]);
    setLobbyParticipants([]);
    setDisplayMessages([]);
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

  return (
    <>
      {logoutInitialState && (
        <Modal onClose={() => dispatch(setLogout(false))}>
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
              speakerId={speakerId}
              localTracks={localTrack}
            />
          )}
          <VideoCallParticipants
            lobbyParticipants={lobbyParticipants}
            sendMessage={sendMessage}
            setChannelMessage={setChannelMessage}
            channelMessage={channelMessage}
            displayMessages={displayMessages}
          />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserVideoCallPage;
