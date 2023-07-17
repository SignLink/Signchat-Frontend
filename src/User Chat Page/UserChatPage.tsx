import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../Main Components/UserNavigation";
import UserChatBox from "./User Chat Components/UserChatBox";
import UserChats from "./User Chat Components/UserChats";
import "./UserChatPage.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../Store-Redux/LogoutReducer";
import Modal from "../Main Components/Modal";
import LogoutModal from "../Main Components/LogoutModal";
import AutoLogoutModal from "../Main Components/AutoLogoutModal";
import { setAutoLogout } from "../Store-Redux/AuthReducer";

function UserChatPage() {
  const logoutInitialState = useSelector(
    (state: any) => state.logout.logoutIsOpen
  );
  const autoLogOut = useSelector(
    (state: any) => state.authentication.autoLogOut
  );

  const autoLogoutTimer = useSelector(
    (state: any) => state.authentication.autoLogoutTimer
  );
  const dispatch = useDispatch();

  //reset timer when user is active
  function resetLogoutTimer() {
    if (autoLogoutTimer) {
      clearTimeout(autoLogoutTimer);
      console.log('clicked')
    }
    setTimeout(() => {
      dispatch(setAutoLogout(true));
    }, 5000);
  }
  return (
    <>
      {autoLogOut && (
        <Modal>
          <AutoLogoutModal />
        </Modal>
      )}
      {logoutInitialState && (
        <Modal onClose={() => dispatch(setLogout(false))}>
          <LogoutModal />
        </Modal>
      )}
      <MainWrapper>
        <div className="user-chat-main" onClick={resetLogoutTimer}>
          <UserNavigation />
          <UserChatBox />
          <UserChats />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserChatPage;
