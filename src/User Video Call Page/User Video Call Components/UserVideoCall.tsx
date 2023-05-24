import Button from "../../Main Components/Button";
import "./UserVideoCall.css";
import meeting from "../../Images/Remote-meeting.svg";

function UserVideoCall() {
  return (
    <>
      <div className="user-videocall">
        <div className="videocall-image">
          <img src={meeting} alt="" />
        </div>
        <div className="videocall-button">
          <Button buttonName="Start Video Call" />
        </div>
      </div>
    </>
  );
}

export default UserVideoCall;
