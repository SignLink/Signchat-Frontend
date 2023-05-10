import Logo from "./Signup Components/Logo";
import "../Sign Up Page/Signup.css";
import SignupInputs from "./Signup Components/SignupInputs";

function Signup() {
  return (
      <div className="signup-main">
        <Logo />
        <SignupInputs />
      </div>
  );
}

export default Signup;
