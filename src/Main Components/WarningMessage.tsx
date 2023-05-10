import React from "react";
import warning from "../Icons/icons8-warning.png";
import '../Contact Page/Contact Components/ContactDescription.css'

interface Props {
  warningMessage: string;
}

function WarningMessage({ warningMessage }: Props) {
  return (
    <div className="warning-message">
      <img src={warning} alt="warning" />
      <span>{warningMessage}</span>
    </div>
  );
}

export default WarningMessage;
