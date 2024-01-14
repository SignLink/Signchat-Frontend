import "./UserNavigation.css";
import logo from "../assets/Images/signchat-logo.svg";
import logout from "../assets/Icons/log-out.png";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/reducers/LogoutReducer";

function UserNavigation() {

  const dispatchLogout = useDispatch();

  return (
    <div className="user-navigation-main">
      <div className="user-navigation-logo">
        <img src={logo} alt="main-logo" />
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
