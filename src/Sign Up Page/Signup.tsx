import Logo from "./Signup Components/Logo";
import "../Sign Up Page/Signup.css";
import SignupInputs from "./Signup Components/SignupInputs";
import { useSelector } from "react-redux";

function Signup() {
  const signupState = useSelector((state: any) => state.signup.signupIsOpen);
  console.log(signupState);

  return (
    <div className={`signup-main`}>
      <Logo />
      <SignupInputs />
    </div>
  );
}

export default Signup;
