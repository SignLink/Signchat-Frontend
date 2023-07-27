import "../Signup.css";
import lady from "../../Images/gorgeous-smiling-female.svg";
import mainLogo from "../../Images/signchat-logo.svg";
import Button from "../../Main Components/Button";
import { useReducer, useEffect, useState } from "react";
import WarningMessage from "../../Main Components/WarningMessage";
import { useDispatch, useSelector } from "react-redux";
import { openLogin } from "../../Store-Redux/LoginReducer";
import { closeSignup } from "../../Store-Redux/SignupReducer";
import { api } from "../../API/Axios";
import { endpoints } from "../../API/Endpoints";
import notValid from "../../Icons/icons8-close-colored.svg";
import valid from "../../Icons/icons8-ok.svg";
import {
  setNotificationBackgroundColor,
  setNotificationBorderColor,
  setNotificationIcon,
  setNotificationMessage,
  setNotificationTextColor,
  setShowNotification,
} from "../../Store-Redux/NotificationReducer";

interface signupState {
  email: string;
  password: string;
  confirmPassword: string;
  inputIsNotValid: boolean;
  warning: string;
  emailNotValid: boolean;
  passwordNotValid: boolean;
}

interface signupAction {
  type: string;
  payload: any;
}

function reducer(state: signupState, action: signupAction): signupState {
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
    email: "",
    password: "",
    confirmPassword: "",
    emailNotValid: false,
    passwordNotValid: false,
    inputIsNotValid: false,
    warning: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  //Valid Inputs
  const validEmail = state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const validPassword = state.password.match(
    /(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/
  );
  const validPasswordLength = state.password.trim().length >= 6;
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

  function validatePassword(password: string) {
    const passwordHasNumber = /\d/.test(password);
    const passwordHasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordIsValid =
      validPasswordLength && (passwordHasNumber || passwordHasSymbol);

    if (!validPasswordLength) {
      dispatch({
        type: "warning",
        payload: "Password must be 6 characters long",
      });
      dispatch({ type: "inputNotValid", payload: true });
      dispatch({ type: "passwordNotValid", payload: true });
    } else if (!passwordHasNumber || !passwordHasSymbol) {
      dispatch({
        type: "warning",
        payload: "Password must have a number and symbol",
      });
      dispatch({ type: "inputNotValid", payload: true });
      dispatch({ type: "passwordNotValid", payload: true });
    } else if (passwordIsValid) {
      dispatch({ type: "passwordNotValid", payload: false });
      dispatch({ type: "inputNotValid", payload: false });
      dispatch({ type: "passwordNotValid", payload: false });
    }
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
  //Notification States
  const dispatchNotifications = useDispatch();
  const notificationIsOpen = useSelector(
    (state: any) => state.notification.notificationIsOpen
  );

  // notification closes after 4secs
  useEffect(() => {
    const closeNotificationAfterDelay = setTimeout(() => {
      dispatchNotifications(setShowNotification(false));
    }, 4000);

    return () => {
      clearTimeout(closeNotificationAfterDelay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationIsOpen]);

  //Submit New Account Form
  async function submitNewAccountForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
        payload: "Password must be at least 6 characters",
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

    const data = {
      email: state.email,
      password: state.password,
      returnSecureToken: true,
    };

    try {
      setIsLoading(true);
      const response = await api.post(endpoints.signUp, data);
      // console.log(response.data);
      dispatchNotifications(setShowNotification(true));
      dispatchNotifications(setNotificationMessage("Successfully Signed Up"));
      dispatchNotifications(setNotificationIcon(valid));
      dispatchNotifications(setNotificationBackgroundColor("#c8ffc8"));
      dispatchNotifications(setNotificationTextColor("#008000"));
      dispatchNotifications(setNotificationBorderColor("#008000"));
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      if (error.response.data.error.message === "EMAIL_EXISTS") {
        dispatchNotifications(setShowNotification(true));
        dispatchNotifications(setNotificationMessage("Email Already Exists"));
        dispatchNotifications(setNotificationIcon(notValid));
        dispatchNotifications(setNotificationBackgroundColor("#ffc8c8"));
        dispatchNotifications(setNotificationTextColor("#800000"));
        dispatchNotifications(setNotificationBorderColor("#800000"));
        return;
      }
    }
    dispatch({ type: "email", payload: "" });
    dispatch({ type: "password", payload: "" });
    dispatch({ type: "confirmPassword", payload: "" });
  }

  //open login page when u click login
  const dispatchLogin = useDispatch();

  function openLoginPage() {
    dispatchLogin(openLogin());
    dispatchLogin(closeSignup());
  }

  return (
    <>
      <div className="signup-inputs-main">
        <div className="signup-inputs">
          {state.inputIsNotValid && (
            <WarningMessage warningMessage={state.warning} inlineWidth="100%" />
          )}
          <div className="signup-inputs-logo">
            <img src={mainLogo} alt="main-logo" />
          </div>
          <h1>Create An Account</h1>
          <form onSubmit={submitNewAccountForm}>
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
            {!isLoading && <Button buttonName="Create Account" />}
            {isLoading && <Button buttonName="Signing Up..." />}
          </form>
          <span>
            Already have an account?{" "}
            <span className="login-link" onClick={openLoginPage}>
              Login
            </span>
          </span>
        </div>
        <div className="signup-image">
          <img src={lady} alt="lady-smiling" id="lady-image"></img>
        </div>
      </div>
    </>
  );
}

export default SignupInputs;
