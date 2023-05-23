import React from "react";
import Navigation from "../Main Components/Navigation";
import MainWrapper from "../Main Components/MainWrapper";
import AboutUsDescription from "./About Components/AboutUsDescription";
import Footer from "../Main Components/Footer";
import Login from "../Login Page/Login";
import Modal from "../Main Components/Modal";
import { useSelector } from "react-redux";
import Signup from "../Sign Up Page/Signup";

function About() {
  const loginInitialState = useSelector(
    (state: any) => state.login.loginIsOpen
  );
   const signupInitialState = useSelector(
     (state: any) => state.signup.signupIsOpen
   );

  return (
    <>
      {signupInitialState && (
        <Modal>
          <Signup />
        </Modal>
      )}
      {loginInitialState && (
        <Modal>
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
