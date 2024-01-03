import React, { useState } from "react";
import Button from "../../../components/Button";
import "./VideoCallPopup.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setLobbyRoomName,
  setLobbyUserName,
} from "../../../store/reducers/LobbyReducer";

interface Props {
  openCall: () => void;
}

function VideoCallPopup({ openCall }: Props) {
  const dispatch = useDispatch();
  const lobbyUserName = useSelector((state: any) => state.lobby.lobbyUserName);
  const lobbyRoomName = useSelector((state: any) => state.lobby.lobbyRoomName);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function submitLobbyForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!lobbyRoomName) {
      setShowErrorMessage(true);
      setErrorMessage("Please enter a room name");
      return;
    }
    if (lobbyRoomName < 3) {
      setShowErrorMessage(true);
      setErrorMessage("Room name should be at least 3 characters");
      return;
    }
    if (!lobbyUserName) {
      setShowErrorMessage(true);
      setErrorMessage("Please enter your name");
      return;
    }
    if (lobbyUserName < 3) {
      setShowErrorMessage(true);
      setErrorMessage("Room name should be at least 3 characters");
      return;
    }

    openCall();
  }

  return (
    <>
      <div className="videocall-popup-main">
        <form onSubmit={submitLobbyForm}>
          <div className="videocall-popup-title">
            <span>Create Room</span>
          </div>
          {showErrorMessage && (
            <span className="lobby-error-message">{errorMessage}</span>
          )}
          <div className="room-name">
            <input
              type="text"
              id="input-room-name"
              placeholder="Enter Room Name..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setLobbyRoomName(event.target.value));
                setShowErrorMessage(false);
              }}
              value={lobbyRoomName}
            />
            <input
              type="text"
              id="input-name"
              placeholder="Enter Name..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setLobbyUserName(event.target.value));
                setShowErrorMessage(false);
                //  setLobbyParticipants((prevParticipants) => [
                //    ...prevParticipants,
                //    { participantName: event.target.value },
                //  ]);
              }}
              value={lobbyUserName}
            />
          </div>
          <div className="create-videocall-button-div">
            <Button buttonName="Join Video Call" />
          </div>
        </form>
      </div>
    </>
  );
}

export default VideoCallPopup;
