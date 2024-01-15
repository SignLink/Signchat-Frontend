import { ReactElement, useEffect, useState } from "react";
import "./VideoCallParticipants.css";
import profile from "../../../assets/Icons/male-user.png";
import send from "../../../assets/Icons/send.svg";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../store/reducers/AuthReducer";
import useResponsiveFunction from "../../../utilities/SmallScreen";
import userMenu from "../../../assets/Icons/user-menu.png";
import participantsClose from "../../../assets/Icons/participants-close.png";
import { setLogout } from "../../../store/reducers/LogoutReducer";
import logout from "../../../assets/Icons/log-out.png";

let participants: ReactElement;

interface props {
  lobbyParticipants: {
    participantId: string;
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
  const userInfo = useSelector((state: any) => state.authentication.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      dispatch(setUserInfo(storedEmail));
    }
  }, [dispatch]);

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
        {lobbyParticipants.map(function (names: any, index: number) {
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

  //responsiveness
  const { isSmallScreen } = useResponsiveFunction();
  const [showParticipantsStuff, setShowParticipantsStuff] =
    useState<boolean>(false);

  return (
    <>
      {isSmallScreen ? (
        <>
          {showParticipantsStuff ? (
            <div className="videocall-participants-main">
              <div
                className="close"
                onClick={() => setShowParticipantsStuff(false)}
              >
                <img src={participantsClose} alt="close" />
              </div>
              <div className="participants">
                <div className="participants-title">
                  <h2>Participants</h2>
                </div>
                <div className="participants-lists">
                  {participants}
                  <div></div>
                </div>
              </div>
              <span className="line"></span>
              <div className="videocall-chat-main">
                <div className="videocall-chat-box">
                  {displayMessages.length === 0 ? (
                    <>
                      <div className="empty-message">
                        <span>No Messages</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {displayMessages.map(function (sender, index) {
                        return (
                          <div className="chat-info" key={index}>
                            <img src={profile} alt="profile-pic" />
                            <div className="chat">
                              <span>{sender.userName}</span>
                              <div className="chat-message">
                                {sender.userMessage}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
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
                    <button>
                      <img src={send} alt="send" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="user-logout-div-participants">
                <button
                  className="user-logout-participants"
                  onClick={() => dispatch(setLogout(true))}
                >
                  <img src={logout} alt="chat-icon" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div
              className="smaller-screen-user-button"
              onClick={() => setShowParticipantsStuff(true)}
            >
              <img src={userMenu} alt="menu-button" />
            </div>
          )}
        </>
      ) : (
        <div className="videocall-participants-main">
          <div className="user-name">
            <img src={profile} alt="" />
            <span>{userInfo}</span>
          </div>
          <div className="participants">
            <div className="participants-title">
              <h2>Participants</h2>
            </div>
            <div className="participants-lists">
              {participants}
              <div></div>
            </div>
          </div>
          <span className="line"></span>
          <div className="videocall-chat-main">
            <div className="videocall-chat-box">
              {displayMessages.length === 0 ? (
                <>
                  <div className="empty-message">
                    <span>No Messages</span>
                  </div>
                </>
              ) : (
                <>
                  {displayMessages.map(function (sender, index) {
                    return (
                      <div className="chat-info" key={index}>
                        <img src={profile} alt="profile-pic" />
                        <div className="chat">
                          <span>{sender.userName}</span>
                          <div className="chat-message">
                            {sender.userMessage}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
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
                <button>
                  <img src={send} alt="send" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoCallParticipants;
