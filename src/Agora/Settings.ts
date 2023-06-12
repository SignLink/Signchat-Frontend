import AgoraRTC from "agora-rtc-sdk-ng";

//Agora Video Settings
export const appId = "fc72deb92dd544adb7ed2300bbb52a1a";
export const token =
  "007eJxTYChsfLaLiWtzxHwtwY8b1QJj3ldWvu0SLpyd82u6c/xj7hMKDGnJ5kYpqUmWRikppiYmiSlJ5qkpRsYGBklJSaZGiYaJrMltKQ2BjAwC6xsZGRkgEMTnYCjOTM9LzkgsYWAAAOjoITI=";
export const channelName = "signchat";
export const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})
