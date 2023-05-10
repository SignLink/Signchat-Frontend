import React from "react";
import mainLogo from "../../Images/logo.svg";
import close from "../../Icons/close.svg";
import { useDispatch } from "react-redux";
import { closeSignup } from "../../Store-Redux/SignupReducer";
import { closeModal } from "../../Store-Redux/ModalReducer";
import "../Signup.css";

function Logo() {
  const dispatchModal = useDispatch();
  function closeSignUpPage() {
    dispatchModal(closeModal());
    dispatchModal(closeSignup());
  }
  return (
    <>
      <div className="signup-logo">
        <div className="mainlogo-div">
          <img src={mainLogo} alt="logo" />
        </div>
        <div className="close-icon">
          <img src={close} alt="close" onClick={closeSignUpPage} />
        </div>
      </div>
    </>
  );
}

export default Logo;
