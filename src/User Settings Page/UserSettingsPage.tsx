import React from "react";
import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";
import UserSettings from "./User Settings Components/UserSettings";
import './UserSettingsPage.css'

function UserSettingsPage() {
  return (
    <MainWrapper>
      <div className="user-settings-main">
        <UserNavigation />
        <UserSettings/>
      </div>
    </MainWrapper>
  );
}

export default UserSettingsPage;
