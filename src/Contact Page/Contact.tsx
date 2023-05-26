import Navigation from "../Main Components/Navigation";
import MainWrapper from "../Main Components/MainWrapper";
import Footer from "../Main Components/Footer";
import ContactDescription from "./Contact Components/ContactDescription";
import Login from "../Login Page/Login";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Main Components/Modal";
import Signup from "../Sign Up Page/Signup";
import { closeLogin } from "../Store-Redux/LoginReducer";
import { closeModal } from "../Store-Redux/ModalReducer";
import { closeSignup } from "../Store-Redux/SignupReducer";

function Contact() {
  const loginInitialState = useSelector(
    (state: any) => state.login.loginIsOpen
  );
  const signupInitialState = useSelector(
    (state: any) => state.signup.signupIsOpen
  );

  const dispatchModal = useDispatch()

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
        <ContactDescription />
      </MainWrapper>
      <Footer />
    </>
  );
}

export default Contact;
