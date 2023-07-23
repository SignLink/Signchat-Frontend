import { ReactElement, useState } from "react";
import "./UserChats.css";
import profilePic from "../../Icons/male-user.svg";

function UserChats() {
  const chatsOject = [
    {
      chatName: "Bejamin Wilson",
    },
  ];
  const [chatLists, setChatLists] = useState(chatsOject);
  const [newChatColor, setNewChatColor] = useState("#008AB8");

  let chats: ReactElement;
  if (chatLists.length === 0) {
    chats = (
      <div className="empty-message">
        <span>No New Chats</span>
      </div>
    );
  } else {
    chats = (
      <>
        {chatLists.map(function (friendChats, index) {
          return (
            <div className="individual-chats" key={index}>
              <div className="persons-profile">
                <img src={profilePic} alt="profile-pic" />
              </div>
              <div className="individual-chats-info">
                <span>{friendChats.chatName}</span>
                <span style={{ color: newChatColor, fontWeight: "700" }}>
                  Hello
                </span>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="user-chats-main">
      <div className="search-chat">
        <span>Chats</span>
        <input type={"search"} placeholder="Search..." />
      </div>
      <div className="chats">{chats}</div>
    </div>
  );
}

export default UserChats;
