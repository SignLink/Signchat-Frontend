import introPerson from "../../../assets/Images/Person-Sign-Language-Classes.png";
import "../Home Components/Introduction.css";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { openSignup } from "../../../store/reducers/SignupReducer";
import useResponsiveFunction from "../../../utilities/SmallScreen";

function Introduction() {
  const dispatchModal = useDispatch();

  function openSignupPage() {
    dispatchModal(openSignup());
  }

  const { isSmallScreen } = useResponsiveFunction();
  return (
    <>
      <div className="intro-main">
        <div className="intro-description">
          <h1>Welcome to SignChat</h1>
          <p>
            The perfect place for anyone who wants to communicate with the deaf
            community through sign language! Join our community of signers from
            all over the world and start chatting in sign language today.
          </p>
          <div className="sign-up-button">
            <Button buttonName="Sign Up" openModal={openSignupPage} />
          </div>
        </div>
        <div className="intro-pic">
          {isSmallScreen && <div className="overlay"></div>}
          <img src={introPerson} alt="person-doing-sign-on-laptop"></img>
        </div>
      </div>
    </>
  );
}

export default Introduction;
