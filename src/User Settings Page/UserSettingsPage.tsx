import React from "react";
import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";

function UserSettingsPage() {
  return (
    <MainWrapper>
      <div className="user-settings-main">
        <UserNavigation />
      </div>
    </MainWrapper>
  );
}

export default UserSettingsPage;
