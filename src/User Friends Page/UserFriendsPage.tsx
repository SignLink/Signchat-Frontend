import React from "react";
import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";

function UserFriendsPage() {
  return (
    <MainWrapper>
      <div className="user-friends-main">
        <UserNavigation />
      </div>
    </MainWrapper>
  );
}

export default UserFriendsPage;
