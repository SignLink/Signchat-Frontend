import Navigation from "../Main Components/Navigation";
import Introduction from "./Home Components/Introduction";
import Descriptions from "./Home Components/Descriptions";
import MainWrapper from "../Main Components/MainWrapper";
import HowItWorks from "./Home Components/HowItWorks";
import Footer from "../Main Components/Footer";
import Modal from "../Main Components/Modal";
import Signup from "../Sign Up Page/Signup";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login Page/Login";
import { closeLogin } from "../Store-Redux/LoginReducer";
import { closeModal } from "../Store-Redux/ModalReducer";
import { closeSignup } from "../Store-Redux/SignupReducer";
import Notification from "../Main Components/Notification";

function Home() {
  const signupInitialState = useSelector(
    (state: any) => state.signup.signupIsOpen
  );
  const loginInitialState = useSelector(
    (state: any) => state.login.loginIsOpen
  );

  const notificationInitialState = useSelector(
    (state: any) => state.notification.notificationIsOpen
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
          <>
            {notificationInitialState && <Notification />}
            <Signup />
          </>
        </Modal>
      )}
      {loginInitialState && (
        <Modal onClose={closeModalHandler}>
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
