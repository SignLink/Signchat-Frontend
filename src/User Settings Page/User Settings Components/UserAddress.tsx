import React from "react";
import editIcon from "../../Icons/edit-30.png";
import './UserAddress.css'

function UserAddress() {
  return (
    <div className="user-address-main">
      <span className="user-address-title">Address</span>
      <div className="user-address-info">
        <div className="user-address-inputs">
          <div className="country-input">
            <span>Country</span>
            <input type="text" placeholder="Ghana" />
          </div>
          <div className="city-state-input">
            <span>City/State</span>
            <input type="text" placeholder="Accra" />
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

export default UserAddress;
