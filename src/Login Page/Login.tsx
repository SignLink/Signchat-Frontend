import React from "react";
import Logo from "../Sign Up Page/Signup Components/Logo";
import '../Login Page/Login.css'
import LoginInputs from "./Login Components/LoginInputs";

function Login() {
  return (
    <>
      <div className="login-page-main">
        <Logo />
        <LoginInputs/>
      </div>
    </>
  );
}

export default Login;
