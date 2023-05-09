import React from "react";
import mainLogo from "../../Images/logo.svg";
import close from '../../Icons/close.svg'

function Logo() {
  return (
    <>
      <div className="signup-logo">
        <div className="mainlogo-div">
          <img src={mainLogo} alt="logo" />
        </div>
        <div className="close-icon">
            <img src={close} alt="close" />
        </div>
      </div>
    </>
  );
}

export default Logo;
