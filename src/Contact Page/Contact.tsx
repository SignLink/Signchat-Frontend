import Navigation from "../Main Components/Navigation";
import MainWrapper from "../Main Components/MainWrapper";
import Footer from "../Main Components/Footer";
import ContactDescription from "./Contact Components/ContactDescription";
import Login from "../Login Page/Login";
import { useSelector } from "react-redux";
import Modal from "../Main Components/Modal";
import Signup from "../Sign Up Page/Signup";

function Contact() {
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
        <ContactDescription />
      </MainWrapper>
      <Footer />
    </>
  );
}

export default Contact;
