import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../User Main Components/UserNavigation";

function UserChatPage() {
  return (
    <MainWrapper>
      <div className="user-chat-main">
        <UserNavigation />
      </div>
    </MainWrapper>
  );
}

export default UserChatPage;
