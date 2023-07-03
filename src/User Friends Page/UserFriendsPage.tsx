import { useState } from "react";
import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";
import "./UserFriendsPage.css";
import UserFriends from "./User Friends Components/UserFriends";
import Modal from "../Main Components/Modal";
import FriendRequestsPopups from "./User Friends Components/FriendRequestsPopups";
import AddFriendsPopup from "./User Friends Components/AddFriendsPopup";

function UserFriendsPage() {
  const [openFriendRequests, setOpenFriendRequests] = useState(false);
  const [openAddFriends, setOpenAddFriends] = useState(false);

  function closeFriendRequests() {
    setOpenFriendRequests(false);
  }

  function closeAddFriends() {
    setOpenAddFriends(false);
  }

  return (
    <>
      {openFriendRequests && (
        <Modal onClose={closeFriendRequests}>
          <FriendRequestsPopups />
        </Modal>
      )}
      {openAddFriends && (
        <Modal onClose={closeAddFriends}>
          <AddFriendsPopup />
        </Modal>
      )}
      <MainWrapper>
        <div className="user-friends-page-main">
          <UserNavigation />
          <UserFriends
            openAddFriends={() => setOpenAddFriends(true)}
            openFriendRequests={() => setOpenFriendRequests(true)}
          />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserFriendsPage;
