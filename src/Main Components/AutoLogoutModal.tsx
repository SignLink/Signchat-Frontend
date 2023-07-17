import { useDispatch } from "react-redux";
import "./AutoLogoutModal.css";
import { setAutoLogout, setToken } from "../Store-Redux/AuthReducer";
import { setLogout } from "../Store-Redux/LogoutReducer";
import { useNavigate } from "react-router";

function AutoLogoutModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="autologout-main">
      <span>You have been inactive for 10min. You have been logged out</span>
      <button
        onClick={() => {
          dispatch(setToken(null));
          dispatch(setLogout(false));
          dispatch(setAutoLogout(false));
          localStorage.removeItem("token"); 
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default AutoLogoutModal;
