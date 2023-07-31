import muteIcon from "../../Icons/mute-unmute.svg";
import noVideo from "../../Icons/no-video.svg";
import "./UserActiveVideoCall.css";
import people from "../../Icons/people.svg";
import { AgoraVideoPlayer } from "agora-rtc-react";
import { UID } from "agora-rtc-sdk-ng";
import { localTracksTypes } from "../UserVideoCallPage";
import { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
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
}: Props) {
  //Function to handle clicking on a remote user's video player
  let peopleOrPerson = userCount === 1 ? "Person" : "People";

  const videoRef = useRef<any>();
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [signSubtitles, setSignSubtitles] = useState("");

  // Define our labelmap
  // const labelMap: any = {
  //   1: { name: "Hello", color: "#2127d5" },
  //   2: { name: "Thank You", color: "#2127d5" },
  //   3: { name: "I Love You", color: "#2127d5" },
  //   4: { name: "Yes", color: "#2127d5" },
  //   5: { name: "No", color: "#2127d5" },
  // };

  // // Define a drawing function
  // function drawRect(
  //   boxes: any,
  //   classes: any,
  //   scores: any,
  //   threshold: any,
  //   imgWidth: any,
  //   imgHeight: any,
  //   ctx: any
  // ) {
  //   for (let i = 0; i <= boxes.length; i++) {
  //     if (boxes[i] && classes[i] && scores[i] > threshold) {
  //       // Extract variables
  //       const [y, x, height, width] = boxes[i];
  //       const text = classes[i];

  //       // DRAW!!
  //       ctx.strokeStyle = labelMap[text]["color"];
  //       ctx.lineWidth = 10;

  //        ctx.fillStyle = "white";
  //        ctx.font = "30px Arial";

  //        // DRAW!!
  //        ctx.beginPath();
  //        ctx.fillText(
  //          labelMap[text]["name"] + " - " + Math.round(scores[i] * 100) / 100,
  //          x * imgWidth,
  //          y * imgHeight - 10
  //        );
  //        ctx.rect(
  //          x * imgWidth,
  //          y * imgHeight,
  //          (width * imgWidth) / 2,
  //          (height * imgHeight) / 1.5
  //        );
  //        ctx.stroke();

  //       // const newWord = labelMap[text]["name"];
  //       // setSignSubtitles((prevSubtitles) => prevSubtitles + " " + newWord);
  //       // ctx.rect(
  //       //   x * imgWidth,
  //       //   y * imgHeight,
  //       //   (width * imgWidth) / 2,
  //       //   (height * imgHeight) / 1.5
  //       // );
  //       // ctx.stroke();
  //     }
  //   }
  // }

  // async function runSignLanguageModel() {
  //   const model = await tf.loadGraphModel(
  //     "https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json"
  //   );

  //   //  Loop and detect hands
  //   setInterval(() => {
  //     detect(model);
  //   }, 16.7);
  // }

  // async function detect(model: any) {
  //   if (videoRef.current) {
  //     const videoElement = videoRef.current?.querySelector("div div div video");
  //     if (videoElement) {
  //       if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
  //         // Video not ready yet, skip this frame
  //         return;
  //       }

  //       //make canvas
  //       if (canvasRef.current) {
  //         canvasRef.current.width = videoElement.videoWidth;
  //         canvasRef.current.height = videoElement.videoHeight;
  //       }
  //       const ctx = canvasRef.current?.getContext("2d");

  //       const videoWidth = videoElement.videoWidth;
  //       const videoHeight = videoElement.videoHeight;

  //       //make detections
  //       const img = tf.browser.fromPixels(videoElement);
  //       //resize image
  //       const resized = tf.image.resizeBilinear(img, [640, 480]);
  //       //expected model input
  //       const casted = resized.cast("int32");
  //       //put in another set of arrays
  //       const expanded = casted.expandDims(0);
  //       const obj = await model.executeAsync(expanded);

  //       const boxes = await obj[1].array();
  //       const classes = await obj[2].array();
  //       const scores = await obj[4].array();

  //       requestAnimationFrame(() => {
  //         drawRect(
  //           boxes[0],
  //           classes[0],
  //           scores[0],
  //           0.8,
  //           videoWidth,
  //           videoHeight,
  //           ctx
  //         );
  //       });

  //       tf.dispose(img);
  //       tf.dispose(resized);
  //       tf.dispose(casted);
  //       tf.dispose(expanded);
  //       tf.dispose(obj);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   runSignLanguageModel();
  // }, []);

  return (
    <>
      <div className="active-videocall-main">
        <div className="video-call-info">
          <span>
            <img src={people} alt="people" />
            {`${userCount + " " + peopleOrPerson}`}
          </span>
        </div>
        <div className="main-user" id="main-user">
          {activeTrack && (
            <div
              className={`main-user-video-player${
                speakerId === activeTrack.id ? "-highlight" : ""
              }`}
              ref={videoRef}
            >
              <AgoraVideoPlayer
                videoTrack={activeTrack?.videoTrack}
                key={activeTrack.id}
                style={{ width: "100%", height: "100%" }}
              />
              <div className="video-call-subtitles">
                <span>{signSubtitles}</span>
              </div>
            </div>
          )}
        </div>
        <div className="video-chat">
          {remoteUsers.length > 0 &&
            remoteUsers?.map(function (remoteUser, index) {
              if (remoteUser.videoTrack) {
                return (
                  <div
                    className={`user-video-player${
                      speakerId?.toString() === remoteUser.id
                        ? "-highlight"
                        : ""
                    }`}
                    key={remoteUser.id}
                    onClick={() => {
                      setRemoteUsers((prev: any) =>
                        prev.filter((_user: any) => _user.id !== remoteUser.id)
                      );
                      setRemoteUsers((prev: any) => [...prev, activeTrack]); // Add the activeTrack to remoteUsers
                      setActiveTrack(remoteUser); // Update the activeTrack
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
