import React, { useState } from "react";
import "./UserNavigation.css";
import logo from "../Images/logo-navigation.svg";
import maleUser from "../Icons/male-user.svg";
import { NavLink } from "react-router-dom";
import chat from "../Icons/chat-icon.svg";
import videocall from "../Icons/videocall-icon.svg";
import schedule from "../Icons/schedule-icon.svg";
import friends from "../Icons/add-user-male.svg";
import settings from "../Icons/settings-icon.svg";
import logout from "../Icons/log-out.png";
import { useDispatch } from "react-redux";
import { setLogout } from "../Store-Redux/LogoutReducer";

function UserNavigation() {
  const [username, setUsername] = useState("Deborah Smith");

  const dispatchLogout = useDispatch();

  return (
    <div className="user-navigation-main">
      <div className="user-navigation-logo">
        <img src={logo} alt="main-logo" />
      </div>
      <div className="user-name">
        <img src={maleUser} alt="" />
        <span>{username}</span>
      </div>
      <div className="user-navigation-buttons">
        <div className="user-chat">
          <NavLink to="/chat">
            <button>
              <img src={chat} alt="chat-icon" />
              <span>Chat</span>
            </button>
          </NavLink>
        </div>
        <div className="user-videocall">
          <NavLink to="/videocall">
            <button>
              <img src={videocall} alt="chat-icon" />
              <span>Video Call</span>
            </button>
          </NavLink>
        </div>
        <div className="user-schedule">
          <NavLink to="/schedule">
            <button>
              <img src={schedule} alt="chat-icon" />
              <span>Schedule</span>
            </button>
          </NavLink>
        </div>
        <div className="user-friends">
          <NavLink to="/friends">
            <button>
              <img src={friends} alt="chat-icon" />
              <span>Friends</span>
            </button>
          </NavLink>
        </div>
        <div className="user-settings">
          <NavLink to="/settings">
            <button>
              <img src={settings} alt="chat-icon" />
              <span>Settings</span>
            </button>
          </NavLink>
        </div>
      </div>
      <div className="user-logout-div">
        <button
          className="user-logout"
          onClick={() => dispatchLogout(setLogout(true))}
        >
          <img src={logout} alt="chat-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default UserNavigation;
