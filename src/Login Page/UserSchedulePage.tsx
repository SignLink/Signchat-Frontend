import React from "react";
import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../Main Components/UserNavigation";
import "./UserSchedulePage.css";
import UserSchedule from "../User Schedule Page/User Schedule Components/UserSchedule";

function UserSchedulePage() {
  return (
    <MainWrapper>
      <div className="user-schedule-page-main">
        <UserNavigation />
        <UserSchedule />
      </div>
    </MainWrapper>
  );
}

export default UserSchedulePage;
