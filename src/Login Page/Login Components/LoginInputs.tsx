import React from "react";
import Button from "../../Main Components/Button";
import { NavLink } from "react-router-dom";
import man from "../../Images/medium-shot-man-with-laptop.svg";
import "../Login.css";

function LoginInputs() {
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
            Don't have an account?<NavLink to="/login"> Sign up</NavLink>
          </span>
        </div>
        <div className="login-image">
          <img src={man} alt="main-on-camera" />
        </div>
      </div>
    </>
  );
}

export default LoginInputs;
