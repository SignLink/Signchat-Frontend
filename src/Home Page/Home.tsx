import React from "react";
import Navigation from "../Main Components/Navigation";
import Introduction from "./Home Components/Introduction";
import Descriptions from "./Home Components/Descriptions";
import MainWrapper from "../Main Components/MainWrapper";
import HowItWorks from "./Home Components/HowItWorks";
import Footer from "../Main Components/Footer";
import Modal from "../Main Components/Modal";
import Signup from "../Sign Up Page/Signup";
import { useSelector } from "react-redux";
import Login from "../Login Page/Login";

function Home() {
  const signupInitialState = useSelector(
    (state: any) => state.signup.signupIsOpen
  );
  const loginInitialState = useSelector(
    (state: any) => state.login.loginIsOpen
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
        <Introduction />
        <Descriptions />
        <HowItWorks />
      </MainWrapper>
      <Footer />
    </>
  );
}

export default Home;
