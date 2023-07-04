import React from "react";
import "./AddFriendsPopup.css";

function AddFriendsPopup() {
  return (
    <div className="add-friends-main">
      <div className="add-friends-header">
        <span>Add Friend</span>
      </div>
      <div className="add-friend-search">
        <input type={"search"} placeholder="Search..." />
      </div>
    </div>
  );
}

export default AddFriendsPopup;
