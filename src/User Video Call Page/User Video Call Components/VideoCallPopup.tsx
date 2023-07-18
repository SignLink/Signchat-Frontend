import React from "react";
import Button from "../../Main Components/Button";
import "./VideoCallPopup.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setLobbyRoomName,
  setLobbyUserName,
} from "../../Store-Redux/LobbyReducer";

interface Props {
  openCall: () => void;
}

function VideoCallPopup({ openCall }: Props) {
  const dispatch = useDispatch();
  const lobbyUserName = useSelector((state: any) => state.lobby.lobbyUserName);
  const lobbyRoomName = useSelector((state: any) => state.lobby.lobbyRoomName);

  return (
    <>
      <div className="videocall-popup-main">
        <div className="videocall-popup-title">
          <span>Create Room</span>
        </div>
        <div className="room-name">
          <input
            type="text"
            id="name"
            placeholder="Enter Name..."
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setLobbyRoomName(event.target.value))
            }
            value={lobbyRoomName}
          />
          <input
            type="text"
            id="input-room-name"
            placeholder="Enter Room Name..."
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setLobbyUserName)
            }
            value={lobbyUserName}
          />
        </div>
        <div className="create-videocall-button-div">
          <Button buttonName="Create Video Call" create={openCall} />
        </div>
      </div>
    </>
  );
}

export default VideoCallPopup;
