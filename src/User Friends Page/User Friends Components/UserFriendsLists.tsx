import "./UserFriendLists.css";
import profilePic from "../../Icons/male-user.svg";
import chat from "../../Icons/chat-icon.svg";
import videoCall from "../../Icons/videocall-icon.svg";

function UserFriendRequests() {
  const friendRequest = [
    {
      friendName: "Sofia Anderson",
    }
  ];
  return (
    <div className="user-friends-requests-main">
      <h1>Friends</h1>
      {friendRequest.map(function (friends, index) {
        return (
          <div className="friend-request" key={index}>
            <div className="friend-profile">
              <img src={profilePic} alt="profile-pic" />
            </div>
            <div className="friend-info">
              <div className="friend-options">
                <span>{friends.friendName}</span>
                <div className="friend-options-buttons">
                  <button>
                    <img src={chat} alt="chat-icon" />
                    <span>Message</span>
                  </button>
                  <button>
                    <img src={videoCall} alt="video-call" />
                    <span>Video Call</span>
                  </button>
                </div>
              </div>
              <div className="friend-delete-button">
                <button>Delete</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserFriendRequests;
