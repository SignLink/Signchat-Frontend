import React from "react";
import Navigation from "../Main Components/Navigation";
import MainWrapper from "../Main Components/MainWrapper";
import Footer from "../Main Components/Footer";
import ContactDescription from "./Contact Components/ContactDescription";
import Login from "../Login Page/Login";
import { useSelector } from "react-redux";
import Modal from "../Main Components/Modal";

function Contact() {
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
        <ContactDescription />
      </MainWrapper>
      <Footer />
    </>
  );
}

export default Contact;
