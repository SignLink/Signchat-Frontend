import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";
import UserChatBox from "./User Chat Components/UserChatBox";
import './UserChatPage.css'

function UserChatPage() {
  return (
    <MainWrapper>
      <div className="user-chat-main">
        <UserNavigation />
        <UserChatBox/>
      </div>
    </MainWrapper>
  );
}

export default UserChatPage;
