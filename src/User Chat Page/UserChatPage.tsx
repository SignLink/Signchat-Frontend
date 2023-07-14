import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../Main Components/UserNavigation";
import UserChatBox from "./User Chat Components/UserChatBox";
import UserChats from "./User Chat Components/UserChats";
import "./UserChatPage.css";

function UserChatPage() {
  return (
    <MainWrapper>
      <div className="user-chat-main">
        <UserNavigation />
        <UserChatBox />
        <UserChats />
      </div>
    </MainWrapper>
  );
}

export default UserChatPage;
