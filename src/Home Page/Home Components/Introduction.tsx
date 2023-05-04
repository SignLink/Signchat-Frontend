import React from "react";
import introPerson from "../../Images/Person-Sign-Language-Classes.png";
import "../Home Components/Introduction.css";
import Button from "../../Main Components/Button";

function Introduction() {
  return (
    <>
      <div className="intro-main">
        <div className="intro-description">
          <h1>Welcome to SignChat</h1>
          <p>
            The perfect place for anyone who wants to communicate with the deaf
            community through sign language! Join our community of signers from
            all over the world and start chatting in sign language today.
          </p>
          <Button buttonName="Sign Up" />
        </div>
        <div className="intro-pic">
          <img src={introPerson} alt="person-doing-sign-on-laptop"></img>
        </div>
      </div>
    </>
  );
}

export default Introduction;
