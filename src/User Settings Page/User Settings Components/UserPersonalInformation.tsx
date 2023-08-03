import { useState, useEffect } from "react";
import editIcon from "../../Icons/edit-30.png";
import "./UserPersonalInformation.css";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../API/Axios";
import { endpoints } from "../../API/Endpoints";
import {
  setNotificationBackgroundColor,
  setNotificationBorderColor,
  setNotificationIcon,
  setNotificationMessage,
  setNotificationTextColor,
  setShowNotification,
} from "../../Store-Redux/NotificationReducer";
import notValid from "../../Icons/icons8-close-colored.svg";
import valid from "../../Icons/icons8-ok.svg";

function UserPersonalInformation() {
  const [enablePersonalInfoEdit, setEnablePersonalInfoEdit] = useState(false);
  const [email, setEmail] = useState("");

  const userEmail = useSelector((state: any) => state.authentication.userInfo);
  const notificationIsOpen = useSelector(
    (state: any) => state.notification.notificationIsOpen
  );
  const dispatch = useDispatch();

  // notification closes after 4secs
  useEffect(() => {
    const closeNotificationAfterDelay = setTimeout(() => {
      dispatch(setShowNotification(false));
    }, 4000);

    return () => {
      clearTimeout(closeNotificationAfterDelay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationIsOpen]);

  async function editButton() {
    if (enablePersonalInfoEdit === false) {
      setEnablePersonalInfoEdit(true);
    } else {
      setEnablePersonalInfoEdit(false);
      const data = {
        idToken: localStorage.getItem("token"),
        email: email,
        returnSecureToken: false,
      };
      try {
        const response = await api.post(endpoints.editEmail, data);
        dispatch(setShowNotification(true));
        dispatch(setNotificationMessage("Change Email Sucessful"));
        dispatch(setNotificationIcon(valid));
        dispatch(setNotificationBackgroundColor("#c8ffc8"));
        dispatch(setNotificationTextColor("#008000"));
        dispatch(setNotificationBorderColor("#008000"));
      } catch (error: any) {
        console.log(error);
        if (
          error.response.data.error.message === "CREDENTIAL_TOO_OLD_LOGIN_AGAIN"
        ) {
          dispatch(setShowNotification(true));
          dispatch(
            setNotificationMessage("Change Email Failed. Please Login Again")
          );
          dispatch(setNotificationIcon(notValid));
          dispatch(setNotificationBackgroundColor("#ffc8c8"));
          dispatch(setNotificationTextColor("#800000"));
          dispatch(setNotificationBorderColor("#800000"));
          setEmail(userEmail);
        }
      }
    }
  }

  return (
    <>
      <div className="user-personal-information-main">
        <span className="user-personal-info-title">Personal Information</span>
        <div className="user-personal-information">
          <div className="user-personal-information-inputs">
            <div className="user-personal-information-inputs-1">
              <div className="personal-info-firstname">
                <span>Firstname</span>
                <input
                  type="text"
                  placeholder="Firstname"
                  disabled={!enablePersonalInfoEdit}
                />
              </div>
              <div className="personal-info-lastname">
                <span>Lastname</span>
                <input
                  type="text"
                  placeholder="Lastname"
                  disabled={!enablePersonalInfoEdit}
                />
              </div>
              <div className="personal-info-sex">
                {" "}
                <span>Sex</span>
                <input
                  type="text"
                  placeholder="Sex"
                  disabled={!enablePersonalInfoEdit}
                />
              </div>
            </div>
            <div className="user-personal-information-inputs-2">
              {" "}
              <span className="user-settings-email">Email</span>
              <input
                type="text"
                placeholder={userEmail}
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                disabled={!enablePersonalInfoEdit}
              />
            </div>
          </div>
          <div className="settings-edit-button">
            <button onClick={editButton} style={{ cursor: "pointer" }}>
              {enablePersonalInfoEdit ? "Save" : "Edit"}{" "}
              <img src={editIcon} alt="edit-icon" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPersonalInformation;
