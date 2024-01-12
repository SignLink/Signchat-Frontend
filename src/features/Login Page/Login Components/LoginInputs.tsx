import Button from "../../../components/Button";
import { useState, useEffect } from "react";
import man from "../../../assets/Images/medium-shot-man-with-laptop.svg";
import mainLogo from "../../../assets/Images/signchat-logo.svg";
import "../Login.css";
import { useDispatch, useSelector } from "react-redux";
import { openSignup } from "../../../store/reducers/SignupReducer";
import { closeLogin } from "../../../store/reducers/LoginReducer";
import { api } from "../../../api/Axios";
import { endpoints } from "../../../api/Endpoints";
import notValid from "../../../assets/Icons/icons8-close-colored.svg";
import {
  setNotificationBackgroundColor,
  setNotificationBorderColor,
  setNotificationIcon,
  setNotificationMessage,
  setNotificationTextColor,
  setShowNotification,
} from "../../../store/reducers/NotificationReducer";
import { setToken, setUserInfo } from "../../../store/reducers/AuthReducer";
import { useNavigate } from "react-router";

function LoginInputs() {
  //open signup page when you click signup
  const notificationIsOpen = useSelector(
    (state: any) => state.notification.notificationIsOpen
  );

  //authentication
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  //Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function openSignupPage() {
    dispatch(openSignup());
    dispatch(closeLogin());
  }

  const dispatchNotifications = useDispatch();

  async function submitLoginDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    try {
      setIsLoading(true);
      const response = await api.post(endpoints.signIn, data);
      console.log(response.data);
      dispatch(setToken(response.data.idToken));
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("user", response.data);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoading(false);
      setUserInfo(response.data.email);
      navigate(`/videocall`);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
        dispatchNotifications(setShowNotification(true));
        dispatchNotifications(
          setNotificationMessage("Email doesn't exist. Please sign up")
        );
        dispatchNotifications(setNotificationIcon(notValid));
        dispatchNotifications(setNotificationBackgroundColor("#ffc8c8"));
        dispatchNotifications(setNotificationTextColor("#800000"));
        dispatchNotifications(setNotificationBorderColor("#800000"));
        return;
      }
      if (error.response.data.error.message === "INVALID_PASSWORD") {
        dispatchNotifications(setShowNotification(true));
        dispatchNotifications(
          setNotificationMessage("Invalid Password. Try Again")
        );
        dispatchNotifications(setNotificationIcon(notValid));
        dispatchNotifications(setNotificationBackgroundColor("#ffc8c8"));
        dispatchNotifications(setNotificationTextColor("#800000"));
        dispatchNotifications(setNotificationBorderColor("#800000"));
        return;
      }

    }
  }
  return (
    <>
      <div className="login-inputs-main">
        <div className="login-inputs">
          <div className="login-inputs-logo">
            <img src={mainLogo} alt="main-logo" />
          </div>
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
            {!isLoading && <Button buttonName="Login" classname="login-button"/>}
            {isLoading && <Button buttonName="Logging in..." classname="login-button"/>}
          </form>
          <span className="switch-to-signup">
            Don't have an account?{" "}
            <span className="signup-link" onClick={openSignupPage}>
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
