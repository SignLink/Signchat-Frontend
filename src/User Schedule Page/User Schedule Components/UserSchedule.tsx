import { NavLink } from "react-router-dom";
import './UserSchedule.css'

function UserSchedule() {
  return (
    <div className="user-schedule-main">
      <div className="user-schedule-1">
        <span>No Active Schedule Yet</span>
        <button>
          <NavLink to={"/videocall"}>Back to Videocall</NavLink>
        </button>
      </div>
    </div>
  );
}

export default UserSchedule;
