import React from "react";
import UserSettingsProfile from "./UserSettingsProfile";
import './UserSettings.css'
import UserPersonalInformation from "./UserPersonalInformation";
import UserAddress from "./UserAddress";

function UserSettings() {
  return (
    <div className="user-settings-in-settings-page">
      <UserSettingsProfile />
      <UserPersonalInformation/>
      <UserAddress/>
    </div>
  );
}

export default UserSettings;
