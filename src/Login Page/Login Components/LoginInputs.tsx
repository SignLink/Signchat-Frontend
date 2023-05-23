import React from "react";
import Button from "../../Main Components/Button";
import man from "../../Images/medium-shot-man-with-laptop.svg";
import "../Login.css";
import { useDispatch } from "react-redux";
import { openSignup } from "../../Store-Redux/SignupReducer";
import { closeLogin } from "../../Store-Redux/LoginReducer";

function LoginInputs() {
  //open signup page when you click signup
  const dispatchSignup = useDispatch();

  function openSignupPage() {
    dispatchSignup(openSignup());
    dispatchSignup(closeLogin());
  }
  return (
    <>
      <div className="login-inputs-main">
        <div className="login-inputs">
          <h1>Welcome Back</h1>
          <form>
            <input
              type="text"
              className="email"
              placeholder="Enter your email"
            />
            <input
              type="password"
              className="password"
              placeholder="Enter password"
            />
            <Button buttonName="Login" />
          </form>
          <span>
            Don't have an account? <span className="signup-link" onClick={openSignupPage}> Sign up</span>
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
