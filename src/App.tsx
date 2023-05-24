import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home Page/Home";
import About from "./About Page/About";
import Contact from "./Contact Page/Contact";
import UserChatPage from "./User Chat Page/UserChatPage";
import UserFriendsPage from "./User Friends Page/UserFriendsPage";
import UserSchedulePage from "./User Schedule Page/UserSchedulePage";
import UserSettingsPage from "./User Settings Page/UserSettingsPage";
import UserVideoCallPage from "./User Video Call Page/UserVideoCallPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/chat" element={<UserChatPage />} />
          <Route path="/user/friends" element={<UserFriendsPage />} />
          <Route path="/user/schedule" element={<UserSchedulePage />} />
          <Route path="/user/settings" element={<UserSettingsPage />} />
          <Route path="/user/videocall" element={<UserVideoCallPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
