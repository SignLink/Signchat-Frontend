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
}

function VideoCallParticipants({ lobbyParticipants }: props) {
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
          <div className="chat-info">
            <img src={profile} alt="profile-pic" />
            <div className="chat">
              <span>Deborah Smith</span>
              <div className="chat-message">
                Hi, you guys. Glad u are here 😁
              </div>
            </div>
          </div>
          <div className="chat-info">
            <img src={profile} alt="profile-pic" />
            <div className="chat">
              <span>John Smith</span>
              <div className="chat-message">
                That sounds fascinating! I'll be presenting a case study on the
                use of technology in sign language interpretation. I think our
                presentations will complement each other well.
              </div>
            </div>
          </div>
        </div>
        <div className="videocall-send">
          <input type="text" placeholder="Send..." id="Send-input" />
          <div className="videocall-send-div">
            <button>
              <img src={send} alt="send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCallParticipants;
