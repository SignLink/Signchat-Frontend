import muteIcon from "../../Icons/mute-unmute.svg";
import noVideo from "../../Icons/no-video.svg";
import "./UserActiveVideoCall.css";
import people from "../../Icons/people.svg";
import { AgoraVideoPlayer } from "agora-rtc-react";
import { UID } from "agora-rtc-sdk-ng";
import { localTracksTypes } from "../UserVideoCallPage";
import { useRef, useEffect, useState } from "react";
interface Props {
  leaveCall?: () => void;
  remoteUsers?: any[];
  userCount?: number;
  localTrack?: localTracksTypes | null;
  setRemoteUsers?: React.Dispatch<React.SetStateAction<any>>;
  activeTrack?: any;
  setActiveTrack?: React.Dispatch<any>;
  muteMicrophone?: () => void;
  muteCamera?: () => void;
  muteCam?: boolean;
  muteMic?: boolean;
  speakerId?: UID | null;
  localTracks?: localTracksTypes | null;
  remoteSpeakerId?: UID | null;
  setSpeakerId?: React.Dispatch<React.SetStateAction<UID | null>>;
  setRemoteSpeakerId?: React.Dispatch<React.SetStateAction<UID | null>>;
}

function UserActiveVideoCall({
  leaveCall,
  remoteUsers = [],
  userCount,
  setRemoteUsers = () => {},
  activeTrack,
  setActiveTrack = () => {},
  muteCam,
  muteCamera,
  muteMic,
  muteMicrophone,
  speakerId,
  remoteSpeakerId,
  setSpeakerId,
  setRemoteSpeakerId,
}: Props) {
  //Function to handle clicking on a remote user's video player
  let peopleOrPerson = userCount === 1 ? "Person" : "People";

  const videoRef = useRef<any>();
  const [signSubtitles, setSignSubtitles] = useState("");
  const [showSubtitles, setShowSubtitles] = useState(false);

  if (videoRef.current) {
    const videoElement = videoRef.current?.querySelector("div div div video");
  }

  let subtitleText: string;
  if (signSubtitles === "") {
    subtitleText = "No Sign Words Yet";
  } else {
    subtitleText = signSubtitles;
  }
  return (
    <>
      <div className="active-videocall-main">
        <div className="video-call-info">
          <span>
            <img src={people} alt="people" />
            {`${userCount + " " + peopleOrPerson}`}
          </span>
          <div className="show-subtitle-button">
            <button
              onClick={() => {
                showSubtitles === false
                  ? setShowSubtitles(true)
                  : setShowSubtitles(false);
              }}
            >
              {showSubtitles === false ? "Show Subtitles" : "Hide Subtitles"}
            </button>
          </div>
          <div className="clear-subtitle-button">
            <button
              onClick={() => {
                setSignSubtitles("");
              }}
            >Clear Subtitles</button>
          </div>
        </div>
        <div className="main-user" id="main-user">
          {activeTrack && (
            <div
              className={
                speakerId === activeTrack.id
                  ? "main-user-video-player-highlight"
                  : "main-user-video-player"
              }
              ref={videoRef}
            >
              <AgoraVideoPlayer
                videoTrack={activeTrack?.videoTrack}
                key={activeTrack.id}
                style={{ width: "100%", height: "100%" }}
              />
              {showSubtitles && (
                <div className="video-call-subtitles">
                  <span>{subtitleText}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="video-chat">
          {remoteUsers.length > 0 &&
            remoteUsers?.map(function (remoteUser) {
              if (remoteUser.videoTrack) {
                return (
                  <div
                    className={
                      remoteSpeakerId?.toString() ||
                      speakerId?.toString() === remoteUser.id
                        ? "user-video-player-highlight"
                        : "user-video-player"
                    }
                    key={remoteUser.id}
                    onClick={() => {
                      if (setRemoteSpeakerId) setRemoteSpeakerId(remoteUser.id);
                      const previousActiveTrack = activeTrack; // Store the activeTrack before setting a new one
                      setActiveTrack(remoteUser);
                      if (setSpeakerId) setSpeakerId(remoteUser.id);
                      setRemoteUsers((prev: any) => {
                        const newRemoteUsers = prev.filter(
                          (_user: any) => _user.id !== remoteUser.id
                        ); // Remove clicked user from remote users
                        newRemoteUsers.push(previousActiveTrack); // Add the previous active user back to the remote users
                        return newRemoteUsers;
                      });
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
          <button
            onClick={muteMicrophone}
            style={{ backgroundColor: muteMic ? "#C8471E" : "#fff" }}
          >
            <img src={muteIcon} alt="mute" />
          </button>
          <button className="leave-button" onClick={leaveCall}>
            Leave
          </button>
          <button
            onClick={muteCamera}
            style={{ backgroundColor: muteCam ? "#C8471E" : "#fff" }}
          >
            <img src={noVideo} alt="no-video" />
          </button>
        </div>
      </div>
    </>
  );
}

export default UserActiveVideoCall;
