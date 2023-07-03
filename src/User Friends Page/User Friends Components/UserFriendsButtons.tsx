import Button from "../../Main Components/Button";
import "./UserFriendsButtons.css";
import { useDispatch } from "react-redux";

interface Props {
  openAddFriends: () => void;
  openFriendRequests: () => void;
}

function UserFriendsButtons({ openAddFriends, openFriendRequests }: Props) {
  return (
    <>
      <div className="user-friends-buttons-main">
        <Button buttonName="Friend Requests" openModal={openFriendRequests} />
        <Button buttonName="Add Friends" openModal={openAddFriends} />
      </div>
    </>
  );
}

export default UserFriendsButtons;
