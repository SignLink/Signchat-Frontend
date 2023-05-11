import warning from "../Icons/icons8-warning.png";
import "../Contact Page/Contact Components/ContactDescription.css";

interface Props {
  warningMessage: string;
  inlineWidth?: string;
}
function WarningMessage({ warningMessage, inlineWidth }: Props) {
  return (
    <div className="warning-message" style={{ width: inlineWidth }}>
      <img src={warning} alt="warning" />
      <span style={{ color: "#00171f" }}>{warningMessage}</span>
    </div>
  );
}

export default WarningMessage;
