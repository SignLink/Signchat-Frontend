import React from "react";
import "./LogoutModal.css";
import { useDispatch } from "react-redux";
import { setLogout } from "../Store-Redux/LogoutReducer";

function LogoutModal() {
  const dispatchLogout = useDispatch();
  return (
    <div className="logout-modal-main">
      <span>Are you sure you want to logout?</span>
      <div className="logout-buttons">
        <button>Yes</button>
        <button onClick={() => dispatchLogout(setLogout(false))}>Cancel</button>
      </div>
    </div>
  );
}

export default LogoutModal;
