import "../Signup.css";
import lady from "../../Images/gorgeous-smiling-female.svg";
import Button from "../../Main Components/Button";
import { NavLink } from "react-router-dom";

function SignupInputs() {
  return (
    <>
      <div className="signup-inputs-main">
        <div className="signup-inputs">
          <h1>Create An Account</h1>
          <input type="text" placeholder="Enter your firstname" />
          <input type="text" placeholder="Enter your lastname" />
          <input type="text" placeholder="Enter your email" />
          <input type="text" placeholder="Enter your password" />
          <input type="text" placeholder="Confirm password" />
          <Button buttonName="Create Account" />
          <span>
            Already have an account? <NavLink to='/login'>Login</NavLink>
          </span>
        </div>
        <div className="signup-image">
          <img src={lady} alt="lady-smiling"></img>
        </div>
      </div>
    </>
  );
}

export default SignupInputs;
