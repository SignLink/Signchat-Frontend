import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";
import UserVideoCall from "./User Video Call Components/UserVideoCall";
import "./UserVideoCallPage.css";
import VideoCallParticipants from "./User Video Call Components/VideoCallParticipants";
import { useState, useEffect } from "react";
import VideoCallPopup from "./User Video Call Components/VideoCallPopup";
import Modal from "../Main Components/Modal";
import UserActiveVideoCall from "./User Video Call Components/UserActiveVideoCall";
import {
  config,
  useMicrophoneAndCameraTracks,
  useClient,
  channelName,
} from "../Agora/Settings";
import { read } from "fs";

type Person = number | any;

function UserVideoCallPage() {
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [currentPeople, setCurrentPeople] = useState<Person[]>([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async function (name: any) {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === "video") {
          setCurrentPeople((prevPeople: any) => {
            return [...prevPeople, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setCurrentPeople((prevPeople) => {
            return prevPeople.filter((User) => User.uid !== user.uid);
          });
        }
      });

      //if user leaves
      client.on("user-left", (user) => {
        setCurrentPeople((prevPeople) => {
          return prevPeople.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, config.token, null);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);

      if (ready && tracks) {
        try {
          init(channelName);
        } catch (error) {
          console.log(error);
        }
      }
    };
  }, [channelName, client, ready, tracks]);

  function openStartVideoCall() {
    setOpenCreateRoom(true);
  }

  return (
    <>
      {openCreateRoom && (
        <Modal onClose={() => setOpenCreateRoom(false)}>
          <VideoCallPopup
            openCall={() => {
              setInCall(true);
              setOpenCreateRoom(false);
              setStart(true)
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
            ready &&
            tracks &&
            start && (
              <UserActiveVideoCall
                currentUsers={currentPeople.length}
                tracks={tracks}
                setStart={setStart}
                setInCall={setInCall}
                users={currentPeople}
              />
            )
          )}
          <VideoCallParticipants />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserVideoCallPage;
