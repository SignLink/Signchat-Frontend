import UserFriendRequests from "./UserFriendsLists";
import "./UserFriends.css";
import UserFriendsButtons from "./UserFriendsButtons";

interface Props {
  openAddFriends: () => void;
  openFriendRequests: () => void;
}

function UserFriends({ openAddFriends, openFriendRequests }: Props) {
  return (
    <div className="user-friends-main">
      <UserFriendsButtons
        openAddFriends={openAddFriends}
        openFriendRequests={openFriendRequests}
      />
      <UserFriendRequests />
    </div>
  );
}

export default UserFriends;
