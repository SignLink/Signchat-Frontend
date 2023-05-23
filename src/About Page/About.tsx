import React from "react";
import Navigation from "../Main Components/Navigation";
import MainWrapper from "../Main Components/MainWrapper";
import AboutUsDescription from "./About Components/AboutUsDescription";
import Footer from "../Main Components/Footer";
import Login from "../Login Page/Login";
import Modal from "../Main Components/Modal";
import { useSelector } from "react-redux";

function About() {
  const loginInitialState = useSelector(
    (state: any) => state.login.loginIsOpen
  );

  return (
    <>
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
