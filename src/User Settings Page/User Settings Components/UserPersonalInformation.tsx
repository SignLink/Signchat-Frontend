import React from "react";
import editIcon from "../../Icons/edit-30.png";
import "./UserPersonalInformation.css";

function UserPersonalInformation() {
  return (
    <div className="user-personal-information-main">
      <span className="user-personal-info-title">Personal Information</span>
      <div className="user-personal-information">
        <div className="user-personal-information-inputs">
          <div className="user-personal-information-inputs-1">
            <div className="personal-info-firstname">
              <span>Firstname</span>
              <input type="text" placeholder="Deborah"/>
            </div>
            <div className="personal-info-lastname">
              <span>Lastname</span>
              <input type="text" placeholder="Smith" />
            </div>
            <div className="personal-info-sex">
              {" "}
              <span>Sex</span>
              <input type="text" placeholder="Female"/>
            </div>
          </div>
          <div className="user-personal-information-inputs-2">
            {" "}
            <span className="user-settings-email">Email</span>
            <input type="text" placeholder="deborahsmith@yahoo.com" />
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

export default UserPersonalInformation;
