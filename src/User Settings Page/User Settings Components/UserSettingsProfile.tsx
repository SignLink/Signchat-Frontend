import './UserSettingsProfile.css'
import bigProfile from '../../Icons/male-user-100.png'

function UserSettingsProfile() {
  return (
    <div className="user-settings-profile-main">
      <span className="settings-profile-title">Profile</span>
      <div className="user-settings-profile">
        <div className="user-settings-profile-info">
          <div className="settings-profile">
            <img src={bigProfile} alt="main-profile-pic" />
          </div>
          <div className="user-settings-profile-1">
            <span className="user-profile-name">Firstname Lastname</span>
            <span className="user-residence">State, Country</span>
            <span className="user-sex">Sex</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettingsProfile;
