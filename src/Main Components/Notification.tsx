import React from "react";
import "./Notification.css";
import check from '../Icons/icons8-ok.svg'

interface props {
  message: string;
  onClose?: () => void;
  colorOfBorder?: string;
  colorOfText?: string;
  colorOfBackground?: string;
  icon?: any
}

function Notification({
  message,
  colorOfBorder,
  colorOfText,
  colorOfBackground,
  icon,
}: props) {
  return (
    <div
      className="notification-modal-main"
      style={{
        borderColor: colorOfBorder,
        color: colorOfText,
        backgroundColor: colorOfBackground,
      }}
    >
      <img src={check} alt="icon"/>
      <span>{message}</span>
    </div>
  );
}

export default Notification;
