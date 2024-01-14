import Button from "../../../components/Button";
import "./UserVideoCall.css";
import meeting from "../../../assets/Images/Remote-meeting.svg";

interface Props {
  openCreateVideoCall: any;
}

function UserVideoCall(props: Props) {
  return (
    <>
      <div className="user-videocall">
        <div className="videocall-image">
          <img src={meeting} alt="" />
        </div>
        <div className="videocall-button">
          <Button
            buttonName="Start Video Call"
            openModal={props.openCreateVideoCall}
            classname="video-call-button"
          />
        </div>
      </div>
    </>
  );
}

export default UserVideoCall;
