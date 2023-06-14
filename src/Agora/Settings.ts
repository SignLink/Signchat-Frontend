import AgoraRTC from "agora-rtc-sdk-ng";

//Agora Video Settings
export const appId = "fc72deb92dd544adb7ed2300bbb52a1a";
export const token =
  "007eJxTYLg956R92XPxiT1bW+LWX50ve3HheQu7NtaEp1oCH22Wrc5VYEhLNjdKSU2yNEpJMTUxSUxJMk9NMTI2MEhKSjI1SjRM/DmnI6UhkJHB/8MRVkYGCATxORiKM9PzkjMSSxgYAIV6I/c=";
export const channelName = "signchat";
export const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
