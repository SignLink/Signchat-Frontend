import React, { useState, useEffect } from "react";
import muteIcon from "../../Icons/mute-unmute.svg";
import fullscreen from "../../Icons/full-screen.svg";
import shareScreen from "../../Icons/share-screen.svg";
import noVideo from "../../Icons/no-video.svg";
import "./UserActiveVideoCall.css";
import people from "../../Icons/people.svg";
import addPeople from "../../Icons/add-user-group-woman-man.svg";
import { useClient } from "../../Agora/Settings";
import { AgoraVideoPlayer } from "agora-rtc-react";
interface Props {
  currentUsers: number;
  tracks: any;
  setStart: any;
  setInCall: any;
  users: any[];
}

function UserActiveVideoCall({
  currentUsers,
  tracks,
  setInCall,
  setStart,
  users,
}: Props) {
  const client = useClient();
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  //leave video call
  const leaveChannel = async function () {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  //mute function
  const mute = async function (type: string) {
    //mute audio
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    }
    //mute video
    if (type === "video") {
      await tracks[1].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const muteButtonColor = trackState.audio ? "gray" : "red";
  const offVideoColor = trackState.video ? "gray" : "red";
  return (
    <>
      <div className="active-videocall-main">
        <div className="video-call-info">
          <span>
            <img src={people} alt="people" />
            {`${currentUsers} people`}
          </span>
          <button className="add-people-button">
            <img src={addPeople} alt="add-people" />
            Add People
          </button>
        </div>
        <div className="main-user" id="user-1">
          <AgoraVideoPlayer
            videoTrack={tracks[1]}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div className="video-chat">
          {users.length > 0 &&
            users.map(function (user, index) {
              if (user.videoTrack) {
                return (
                  <div className="video-call-frame" id="user-2" key={index}>
                    <AgoraVideoPlayer
                      videoTrack={user.videoTrack}
                      key={user.uid}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                );
              } else return null;
            })}
        </div>
        <div className="videocall-buttons">
          <button className="sharescreen-button">
            <img src={shareScreen} alt="share-screen" />
          </button>
          <button>
            <img src={fullscreen} alt="full-screen" />
          </button>
          <button className="leave-button" onClick={() => leaveChannel()}>
            Leave
          </button>
          <button
            style={{ backgroundColor: muteButtonColor }}
            onClick={() => mute("audio")}
          >
            <img src={muteIcon} alt="mute" />
          </button>
          <button
            style={{ backgroundColor: offVideoColor }}
            onClick={() => mute("video")}
          >
            <img src={noVideo} alt="no-video" />
          </button>
        </div>
      </div>
    </>
  );
}

export default UserActiveVideoCall;
