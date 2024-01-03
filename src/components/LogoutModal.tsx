import React from "react";
import "./LogoutModal.css";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/reducers/LogoutReducer";
import { setToken } from "../store/reducers/AuthReducer";
import { useNavigate } from "react-router";

function LogoutModal() {
  const dispatchLogout = useDispatch();
  const dispatchAuthentication = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="logout-modal-main">
      <span>Are you sure you want to logout?</span>
      <div className="logout-buttons">
        <button
          onClick={() => {
            dispatchAuthentication(setToken(null));
            dispatchLogout(setLogout(false));
            localStorage.removeItem("token");
            navigate("/");
            localStorage.removeItem("isLoggedIn");
          }}
        >
          Yes
        </button>
        <button
          onClick={() => {
            dispatchLogout(setLogout(false));
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default LogoutModal;
