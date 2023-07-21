import { ReactElement } from "react";
import "./VideoCallParticipants.css";
import line from "../../Images/Line.svg";
import profile from "../../Icons/male-user.svg";
import send from "../../Icons/sent.svg";

let participants: ReactElement;

interface props {
  lobbyParticipants: {
    participantName: string;
  }[];
  sendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
  setChannelMessage: React.Dispatch<React.SetStateAction<string>>;
  channelMessage: string;
  displayMessages: {
    userName: string;
    userMessage: string;
  }[];
}

function VideoCallParticipants({
  lobbyParticipants,
  sendMessage,
  setChannelMessage,
  channelMessage,
  displayMessages,
}: props) {
  if (lobbyParticipants.length === 0) {
    participants = (
      <>
        <div className="empty-message">
          <span>No Participants</span>
        </div>
      </>
    );
  } else {
    participants = (
      <>
        {lobbyParticipants.map(function (names: any, index: any) {
          return (
            <div key={index} className="participants-box">
              <img src={profile} alt="profile-pic" />
              <div className="participants-name-and-mute">
                <span>{names.participantName}</span>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="videocall-participants-main">
      <div className="participants">
        <div className="participants-title">
          <h2>Participants</h2>
          <button
            style={{
              color: lobbyParticipants.length === 0 ? "#ddd" : "#008ab8",
            }}
          >
            View All
          </button>
        </div>
        <div className="participants-lists">
          {participants}
          <div></div>
        </div>
      </div>
      <span className="line">
        <img src={line} alt="line" />
      </span>
      <div className="videocall-chat-main">
        <div className="videocall-chat-box">
          {displayMessages.length === 0 ? (
            <>
              <div className="empty-message">
                <span>No Messages</span>
              </div>
            </>
          ) : (
            <div className="chat-info">
              <img src={profile} alt="profile-pic" />
              {displayMessages.map(function (sender, index) {
                return (
                  <div className="chat" key={index}>
                    <span>{sender.userName}</span>
                    <div className="chat-message">{sender.userMessage}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="videocall-send">
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Send..."
              id="Send-input"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setChannelMessage(event.target.value)
              }
              value={channelMessage}
            />
            <div className="videocall-send-div">
              <button>
                <img src={send} alt="send" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VideoCallParticipants;
