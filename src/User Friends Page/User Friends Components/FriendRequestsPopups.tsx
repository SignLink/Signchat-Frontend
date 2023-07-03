import React, { ReactElement, useState } from "react";
import "./FriendsRequestPopup.css";
import profilePic from "../../Images/christina-morillo-profile.svg";

function FriendRequestsPopups() {
  const listsOfFriendRequests = [
    {
      friendName: "John Smith",
    },
    {
      friendName: "Michael Davis",
    },
    {
      friendName: "Sophia Anderson",
    },
  ];
  const [friendsRequests, setFriendRequests] = useState<
    {
      friendName: string;
    }[]
  >(listsOfFriendRequests);

  let friendRequestsLists: ReactElement;
  if (friendsRequests.length === 0) {
    friendRequestsLists = (
      <div className="empty-message">
        <span>No New Friend Requests</span>
      </div>
    );
  } else {
    friendRequestsLists = (
      <>
        {friendsRequests.map(function (friendRequest, index) {
          return (
            <div className="friend-requests-lists" key={index}>
              <div className="friends-profile-pic">
                <img src={profilePic} alt="profile-pic" />
              </div>
              <div className="friend-requests-descriptions">
                <span>{`${friendRequest.friendName} send you a friend request`}</span>
                <div className="friend-request-buttons">
                  <button>Accept</button>
                  <button>Decline</button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className="friends-requests-main">
        <div className="friend-requests-header">
          <h1>Friend Requests</h1>
        </div>
        <div className="friend-requests">{friendRequestsLists}</div>
      </div>
    </>
  );
}

export default FriendRequestsPopups;
