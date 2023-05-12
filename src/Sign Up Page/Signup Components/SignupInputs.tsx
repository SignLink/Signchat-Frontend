import "../Signup.css";
import lady from "../../Images/gorgeous-smiling-female.svg";
import Button from "../../Main Components/Button";
import { NavLink } from "react-router-dom";
import { useReducer } from "react";
import WarningMessage from "../../Main Components/WarningMessage";

//TODO: Use validation for used email

interface signupState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  inputIsNotValid: boolean;
  warning: string;
  firstnameNotValid: boolean;
  lastnameNotValid: boolean;
  emailNotValid: boolean;
  passwordNotValid: boolean;
}

interface signupAction {
  type: string;
  payload: any;
}

function reducer(state: signupState, action: signupAction): signupState {
  if (action.type === "firstname") {
    return {
      ...state,
      firstname: action.payload,
    };
  }
  if (action.type === "lastname") {
    return {
      ...state,
      lastname: action.payload,
    };
  }
  if (action.type === "email") {
    return {
      ...state,
      email: action.payload,
    };
  }
  if (action.type === "password") {
    return {
      ...state,
      password: action.payload,
    };
  }
  if (action.type === "confirmPassword") {
    return {
      ...state,
      confirmPassword: action.payload,
    };
  }
  if (action.type === "inputNotValid") {
    return {
      ...state,
      inputIsNotValid: action.payload,
    };
  }
  if (action.type === "firstnameNotValid") {
    return {
      ...state,
      firstnameNotValid: action.payload,
    };
  }
  if (action.type === "lastnameNotValid") {
    return {
      ...state,
      lastnameNotValid: action.payload,
    };
  }
  if (action.type === "emailNotValid") {
    return {
      ...state,
      emailNotValid: action.payload,
    };
  }
  if (action.type === "passwordNotValid") {
    return {
      ...state,
      passwordNotValid: action.payload,
    };
  }
  if (action.type === "warning") {
    return {
      ...state,
      warning: action.payload,
    };
  } else return state;
}

function SignupInputs() {
  const initialState: signupState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstnameNotValid: false,
    lastnameNotValid: false,
    emailNotValid: false,
    passwordNotValid: false,
    inputIsNotValid: false,
    warning: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //Valid Inputs
  const validFirstname = state.firstname.trim().length >= 2;
  const validLastname = state.lastname.trim().length >= 2;
  const validEmail = state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const validPassword = state.password.match(/\d/);
  const validPasswordLength = state.password.trim().length >= 5;
  const matchingPassword = state.password === state.confirmPassword;

  //make input border red if input is invalid
  function onFocusValidInputs(
    requirements: boolean | string,
    actionName: string,
    message: string
  ) {
    if (requirements) {
      dispatch({ type: actionName, payload: true });
    } else if (state.warning === message) {
      dispatch({ type: "inputNotValid", payload: false });
      dispatch({ type: actionName, payload: false });
    } else {
      dispatch({ type: actionName, payload: false });
    }
  }

  function validatePassword(password: string): boolean {
    const regex = /^(?=.*\d)[a-zA-Z0-9]{5,}$/; // Password must contain at least one number and be 5 characters or longer
    const isValid = regex.test(password);

    if (isValid) {
      dispatch({ type: "passwordNotValid", payload: false });
      dispatch({ type: "inputNotValid", payload: false });
    } else {
      if (password.length < 5) {
        dispatch({ type: "inputNotValid", payload: true });
        dispatch({
          type: "warning",
          payload: "Password must be at least 5 characters",
        });
      } else {
        dispatch({ type: "passwordNotValid", payload: true });
        dispatch({
          type: "warning",
          payload: "Password requires a number",
        });
      }
      dispatch({ type: "passwordNotValid", payload: true });
    }

    return isValid;
  }

  //onchange functions for inputs
  function firstnameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "firstname", payload: event.target.value });
    onFocusValidInputs(
      !validFirstname,
      "firstnameNotValid",
      "Please enter a valid firstname"
    );
  }
  function lastnameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "lastname", payload: event.target.value });
    onFocusValidInputs(
      !validLastname,
      "lastnameNotValid",
      "Please enter a valid lastname"
    );
  }
  function emailHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "email", payload: event.target.value });
    onFocusValidInputs(
      !validEmail,
      "emailNotValid",
      "Please enter a valid email"
    );
  }
  function passwordHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "password", payload: event.target.value });
    validatePassword(event.target.value);
  }
  function confirmPasswordHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "confirmPassword", payload: event.target.value });
    onFocusValidInputs(
      !matchingPassword,
      "confirmPasswordNotValid",
      "Password must match"
    );
  }

  //Submit New Account Form
  function submitNewAccountForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validFirstname) {
      dispatch({ type: "warning", payload: "Please enter a valid firstname" });
      dispatch({ type: "inputNotValid", payload: true });
      return;
    }
    if (!validLastname) {
      dispatch({ type: "warning", payload: "Please enter a valid lastname" });
      dispatch({ type: "inputNotValid", payload: true });
      return;
    }
    if (!validEmail) {
      dispatch({ type: "warning", payload: "Please enter a valid email" });
      dispatch({ type: "inputNotValid", payload: true });
      return;
    }
    if (!validPassword) {
      dispatch({
        type: "warning",
        payload: "Password requires a number",
      });
      dispatch({ type: "inputNotValid", payload: true });
      return;
    }
    if (!validPasswordLength) {
      dispatch({
        type: "warning",
        payload: "Password must be at least 5 characters",
      });
      dispatch({ type: "inputNotValid", payload: true });
      return;
    }
    if (!matchingPassword) {
      dispatch({ type: "warning", payload: "Password must match" });
      dispatch({ type: "inputNotValid", payload: true });
      return;
    }
    dispatch({ type: "inputNotValid", payload: false });

    // const data = {
    //   firstname: state.firstname,
    //   lastname: state.lastname,
    //   email: state.email,
    //   password: state.password,
    //   confirmPassword: state.confirmPassword,
    // };
    // console.log(data);

    dispatch({ type: "firstname", payload: "" });
    dispatch({ type: "lastname", payload: "" });
    dispatch({ type: "email", payload: "" });
    dispatch({ type: "password", payload: "" });
    dispatch({ type: "confirmPassword", payload: "" });
  }

  return (
    <>
      <div className="signup-inputs-main">
        <div className="signup-inputs">
          {state.inputIsNotValid && (
            <WarningMessage warningMessage={state.warning} inlineWidth="100%" />
          )}
          <h1>Create An Account</h1>
          <form onSubmit={submitNewAccountForm}>
            <input
              type="text"
              placeholder="Enter your firstname"
              onChange={firstnameHandler}
              className={
                state.firstnameNotValid
                  ? "firstname-invalid"
                  : "firstname-valid"
              }
              value={state.firstname}
            />
            <input
              type="text"
              placeholder="Enter your lastname"
              onChange={lastnameHandler}
              className={
                state.lastnameNotValid ? "lastname-invalid" : "lastname-valid"
              }
              value={state.lastname}
            />
            <input
              type="text"
              placeholder="Enter your email"
              onChange={emailHandler}
              className={state.emailNotValid ? "email-invalid" : "email-valid"}
              value={state.email}
            />
            <input
              type="password"
              placeholder="Enter your password"
              onChange={passwordHandler}
              className={
                state.passwordNotValid ? "password-invalid" : "password-valid"
              }
              value={state.password}
            />
            <input
              type="password"
              placeholder="Confirm password"
              onChange={confirmPasswordHandler}
              className={
                !matchingPassword
                  ? "confirm-password-invalid"
                  : "confirm-password-valid"
              }
              value={state.confirmPassword}
            />
            <Button buttonName="Create Account" />
          </form>
          <span>
            Already have an account? <NavLink to="/login">Login</NavLink>
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
