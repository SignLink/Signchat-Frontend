import Navigation from "../components/Navigation";
import Introduction from "./Home Components/Introduction";
import Descriptions from "./Home Components/Descriptions";
import MainWrapper from "../components/MainWrapper";
import HowItWorks from "./Home Components/HowItWorks";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Signup from "../Sign Up Page/Signup";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login Page/Login";
import { closeLogin } from "../Store-Redux/LoginReducer";
import { closeModal } from "../Store-Redux/ModalReducer";
import { closeSignup } from "../Store-Redux/SignupReducer";
import Notification from "../components/Notification";

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
          <>
            {notificationInitialState && <Notification />}
            <Login />
          </>
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
