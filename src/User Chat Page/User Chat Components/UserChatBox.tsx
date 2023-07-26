import React from "react";
import "./UserChatBox.css";
import profile from '../../Icons/male-user.svg'
import send from '../../Icons/send-30.svg'

function UserChatBox() {
  return (
    <div className="user-chatbox-main">
      <div className="user-chatbox">
        <div className="main-user-chats">
          <div className="main-user-chat">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad ullam
              laborum saepe reiciendis facere qui commodi distinctio nesciunt
              iure. Ipsam praesentium saepe quibusdam laudantium accusantium
              distinctio ducimus aut laborum nostrum!
            </p>
          </div>
        </div>
        <div className="other-user-chats">
          <div className="other-user-chat-info">
            <img src={profile} alt="profile-pic" />
            <div className="chat">
              <span>Sophia Anderson</span>
              <div className="other-user-chat-message">
                That sounds fascinating! I'll be presenting a case study on the
                use of technology in sign language interpretation. I think our
                presentations will complement each other well.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="user-send-message"></div>
      <div className="user-chats-send-main">
        <input type="text" className="send-input" placeholder="Send..." />
        <button className="user-chat-send-button"><img src={send} alt="send" /></button>
      </div>
    </div>
  );
}

export default UserChatBox;
