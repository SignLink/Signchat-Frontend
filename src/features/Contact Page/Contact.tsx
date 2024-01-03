import Navigation from "../../components/Navigation";
import MainWrapper from "../../components/MainWrapper";
import Footer from "../../components/Footer";
import ContactDescription from "./Contact Components/ContactDescription";
import Login from "../Login Page/Login";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import Signup from "../Sign Up Page/Signup";
import { closeLogin } from "../../store/reducers/LoginReducer";
import { closeModal } from "../../store/reducers/ModalReducer";
import { closeSignup } from "../../store/reducers/SignupReducer";

function Contact() {
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
        <ContactDescription />
      </MainWrapper>
      <Footer />
    </>
  );
}

export default Contact;
