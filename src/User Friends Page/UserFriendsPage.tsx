import React from "react";
import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";
import "./UserFriendsPage.css";
import UserFriends from "./User Friends Components/UserFriends";

function UserFriendsPage() {
  return (
    <MainWrapper>
      <div className="user-friends-page-main">
        <UserNavigation />
        <UserFriends />
      </div>
    </MainWrapper>
  );
}

export default UserFriendsPage;
