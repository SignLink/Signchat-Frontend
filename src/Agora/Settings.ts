import {
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
//Agora Video Settings
const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
};
export const appId: string = "fc72deb92dd544adb7ed2300bbb52a1a";
export const token: string =
  "007eJxTYLAxDbgfq1pkWd7YnrPNV1ZFaEu4U3WIwT2Z0jd/LrnHuykwpCWbG6WkJlkapaSYmpgkpiSZp6YYGRsYJCUlmRolGiZuWVye0hDIyKAkuZGJkQECQXwhhuLM9LzkjMQS3bLMlNT85MScHAYGAIUgI1Q=";
export const nameOfChannel: string = "signchat-videocall";

//setting up video call
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
