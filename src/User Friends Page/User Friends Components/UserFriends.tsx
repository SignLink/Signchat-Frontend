import UserFriendRequests from './UserFriendRequests';
import './UserFriends.css'
import UserFriendsButtons from "./UserFriendsButtons";

function UserFriends() {
  return (
    <div className="user-friends-main">
      <UserFriendsButtons />
      <UserFriendRequests/>
    </div>
  );
}

export default UserFriends;
