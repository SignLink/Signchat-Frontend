import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId: string = "fc72deb92dd544adb7ed2300bbb52a1a";
const token: string =
  "007eJxTYBCrvu8c+yxExahsb3LIT+X1gmuLCjr85rTfY8oV5SvecluBIS3Z3CglNcnSKCXF1MQkMSXJPDXFyNjAICkpydQo0TDxoX9hSkMgI8OpuUmsjAwQCOILMQRnpuc5ZySW6IZlpqTmOyfm5DAwAAD/rSR4";

export const config: any = {
  mode: "rtc",
  codec: "vp8",
  appId: appId,
  token: token,
};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "SignChat-VideoCall";
