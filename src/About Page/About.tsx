import React from "react";
import Navigation from "../Main Components/Navigation";
import MainWrapper from "../Main Components/MainWrapper";
import AboutUsDescription from "./About Components/AboutUsDescription";
import Footer from "../Main Components/Footer";
import Login from "../Login Page/Login";
import Modal from "../Main Components/Modal";
import { useSelector } from "react-redux";
import Signup from "../Sign Up Page/Signup";
import { useDispatch } from "react-redux";
import { closeModal } from "../Store-Redux/ModalReducer";
import { closeLogin } from "../Store-Redux/LoginReducer";
import { closeSignup } from "../Store-Redux/SignupReducer";

function About() {
  const loginInitialState = useSelector(
    (state: any) => state.login.loginIsOpen
  );
  const signupInitialState = useSelector(
    (state: any) => state.signup.signupIsOpen
  );

  const dispatchModal = useDispatch();

  function closeModalHandler() {
    dispatchModal(closeModal());
    dispatchModal(closeLogin())
    dispatchModal(closeSignup())
  }

  return (
    <>
      {signupInitialState && (
        <Modal onClose={closeModalHandler}>
          <Signup />
        </Modal>
      )}
      {loginInitialState && (
        <Modal onClose={closeModalHandler}>
          <Login />
        </Modal>
      )}
      <MainWrapper>
        <Navigation />
        <AboutUsDescription />
      </MainWrapper>
      <Footer />
    </>
  );
}

export default About;
