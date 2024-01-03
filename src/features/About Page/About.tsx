import React from "react";
import Navigation from "./../../components/Navigation";
import MainWrapper from "./../../components/MainWrapper";
import AboutUsDescription from "./About Components/AboutUsDescription";
import Footer from "./../../components/Footer";
import Login from "../Login Page/Login";
import Modal from "./../../components/Modal";
import { useSelector } from "react-redux";
import Signup from "../Sign Up Page/Signup";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/reducers/ModalReducer";
import { closeLogin } from "../../store/reducers/LoginReducer";
import { closeSignup } from "../../store/reducers/SignupReducer";

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
    dispatchModal(closeLogin());
    dispatchModal(closeSignup());
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
