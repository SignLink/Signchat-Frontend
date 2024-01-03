import React from "react";
import UserSettingsProfile from "./UserSettingsProfile";
import "./UserSettings.css";
import UserPersonalInformation from "./UserPersonalInformation";
import UserAddress from "./UserAddress";
import { useSelector } from "react-redux";
import Notification from "../../components/Notification";

function UserSettings() {
  const notificationInitialState = useSelector(
    (state: any) => state.notification.notificationIsOpen
  );
  return (
    <div className="user-settings-in-settings-page">
      <div className="notification-div">
        {notificationInitialState && <Notification />}
      </div>
      <UserSettingsProfile />
      <UserPersonalInformation />
      <UserAddress />
    </div>
  );
}

export default UserSettings;
