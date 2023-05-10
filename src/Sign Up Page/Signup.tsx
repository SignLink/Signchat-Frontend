import Logo from "./Signup Components/Logo";
import "../Sign Up Page/Signup.css";
import SignupInputs from "./Signup Components/SignupInputs";
import Button from "../Main Components/Button";
import MainWrapper from "../Main Components/MainWrapper";

function Signup() {
  return (
      <div className="signup-main">
        <Logo />
        <SignupInputs />
      </div>
  );
}

export default Signup;
