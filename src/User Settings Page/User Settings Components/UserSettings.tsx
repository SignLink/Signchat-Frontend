import React from "react";
import UserSettingsProfile from "./UserSettingsProfile";
import './UserSettings.css'
import UserPersonalInformation from "./UserPersonalInformation";

function UserSettings() {
  return (
    <div className="user-settings-in-settings-page">
      <UserSettingsProfile />
      <UserPersonalInformation/>
    </div>
  );
}

export default UserSettings;
