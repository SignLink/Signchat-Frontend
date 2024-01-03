import React from "react";
import "../Home Components/Descriptions.css";
import messageIcon from "../../../assets/Icons/message.png";
import videocall from "../../../assets/Icons/videoChat.png";
import signLanguage from "../../../assets/Icons/signlanguage.png";

function Descriptions() {
  return (
    <>
      <div className="descriptions-main">
        <div className="message-description">
          <div className="icon">
            <img src={messageIcon} alt="message" />
          </div>
          <h1>Real-Time Messaging</h1>
          <p>
            SignChat includes a messaging feature that allows users to engage in
            real-time text-based conversation
          </p>
        </div>
        <div className="videocall-description">
          <div className="icon">
            <img src={videocall} alt="message" />
          </div>
          <h1>Real-Time Video Chat</h1>
          <p>
            SignChat allows users to engage in real-time video conversations
            using sign language.
          </p>
        </div>
        <div className="signlanguage-description">
          <div className="icon">
            <img src={signLanguage} alt="message" />
          </div>
          <h1>Sign Language Translation</h1>
          <p>
            Sign language translation feature that enables users to translate
            sign language gestures or signs into written text or spoken
            language.
          </p>
        </div>
      </div>
    </>
  );
}

export default Descriptions;
