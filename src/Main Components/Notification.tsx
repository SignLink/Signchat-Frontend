import React from "react";
import "./Notification.css";
import { useSelector } from "react-redux";

function Notification() {
  const notificationborderColor = useSelector(
    (state: any) => state.notification.notificationBorderColor
  );
  const notificationTextColor = useSelector(
    (state: any) => state.notification.notificationTextColor
  );
  const notificationBackgroundColor = useSelector(
    (state: any) => state.notification.notificationBackgroundColor
  );
  const notificationMessage = useSelector(
    (state: any) => state.notification.notificationMessage
  );
  const notificationIcon = useSelector(
    (state: any) => state.notification.notificationIcon
  );

  return (
    <div
      className="notification-modal-main"
      style={{
        borderColor: notificationborderColor,
        color: notificationTextColor,
        backgroundColor: notificationBackgroundColor,
      }}
    >
      <img src={notificationIcon} alt="icon" />
      <span>{notificationMessage}</span>
    </div>
  );
}

export default Notification;
