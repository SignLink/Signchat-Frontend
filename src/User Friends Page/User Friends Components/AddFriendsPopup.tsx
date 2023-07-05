import React, { JSXElementConstructor, ReactElement, useState } from "react";
import "./AddFriendsPopup.css";
import profilePic from "../../Images/christina-morillo-profile.svg";

function AddFriendsPopup() {
  const friendsPopup = [
    {
      friendName: "Debbie Anderson",
    },
    {
      friendName: "Debbie Anderson",
    },
    {
      friendName: "Debbie Anderson",
    },
    {
      friendName: "Debbie Anderson",
    },
    {
      friendName: "Debbie Anderson",
    },
    {
      friendName: "Debbie Anderson",
    },
    {
      friendName: "Debbie Anderson",
    },
    {
      friendName: "Debbie Anderson",
    },
  ];
  const [searchedPeople, setSetPeople] = useState(friendsPopup);

  let searchFriendslists: ReactElement;
  if (searchedPeople.length === 0) {
    searchFriendslists = (
      <div className="empty-message">
        <span>No Person Found</span>
      </div>
    );
  } else {
    searchFriendslists = (
      <>
        {searchedPeople.map(function (searchedFriends, index) {
          return (
            <div className="searched-friend-requests-lists" key={index}>
              <div className="searched-friends-profile-pic">
                <img src={profilePic} alt="profile-pic" />
              </div>
              <div className="searched-friend-requests-descriptions">
                <span>{`${searchedFriends.friendName} send you a friend request`}</span>
                <div className="searched-friend-request-buttons">
                  <button>Send Friend Request</button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  return (
    <div className="add-friends-main">
      <div className="add-friends-header">
        <span>Add Friend</span>
      </div>
      <div className="add-friend-search">
        <input type={"search"} placeholder="Search..." />
      </div>
      <div className="searched-friends">{searchFriendslists}</div>
    </div>
  );
}

export default AddFriendsPopup;
