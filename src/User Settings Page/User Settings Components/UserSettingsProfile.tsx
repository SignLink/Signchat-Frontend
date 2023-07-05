import React from "react";
import editIcon from "../../Icons/edit-30.png";
import './UserSettingsProfile.css'
import bigProfile from '../../Images/circled-user-male-skin-type.svg'

function UserSettingsProfile() {
  return (
    <div className="user-settings-profile-main">
      <span>Profile</span>
      <div className="user-settings-profile">
        <div className="user-settings-profile-info">
          <div className="settings-profile">
            <img src={bigProfile} alt="main-profile-pic" />
          </div>
          <div className="user-settings-profile-1">
            <span className="user-profile-name">Deborah Smith</span>
            <span className="user-residence">Accra, Ghana</span>
            <span className="user-sex">Female</span>
          </div>
        </div>
        <div className="settings-edit-button">
          <button>
            Edit <img src={editIcon} alt="edit-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserSettingsProfile;
