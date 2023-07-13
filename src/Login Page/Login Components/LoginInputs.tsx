import Button from "../../Main Components/Button";
import { useState } from "react";
import man from "../../Images/medium-shot-man-with-laptop.svg";
import "../Login.css";
import { useDispatch } from "react-redux";
import { openSignup } from "../../Store-Redux/SignupReducer";
import { closeLogin } from "../../Store-Redux/LoginReducer";

function LoginInputs() {
  //open signup page when you click signup
  const dispatchSignup = useDispatch();

  //Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function openSignupPage() {
    dispatchSignup(openSignup());
    dispatchSignup(closeLogin());
  }

  async function submitLoginDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    

    setEmail("");
    setPassword("");
  }
  return (
    <>
      <div className="login-inputs-main">
        <div className="login-inputs">
          <h1>Welcome Back</h1>
          <form onSubmit={submitLoginDetails}>
            <input
              type="text"
              className="email"
              placeholder="Enter your email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              value={email}
            />
            <input
              type="password"
              className="password"
              placeholder="Enter password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
              value={password}
            />
            <Button buttonName="Login" />
          </form>
          <span>
            Don't have an account?{" "}
            <span className="signup-link" onClick={openSignupPage}>
              {" "}
              Sign up
            </span>
          </span>
        </div>
        <div className="login-image">
          <img src={man} alt="man-on-camera" />
        </div>
      </div>
    </>
  );
}

export default LoginInputs;
