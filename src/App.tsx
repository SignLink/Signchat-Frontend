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
          <Route path="/chat" element={<UserChatPage />} />
          <Route path="/friends" element={<UserFriendsPage />} />
          <Route path="/schedule" element={<UserSchedulePage />} />
          <Route path="/settings" element={<UserSettingsPage />} />
          <Route path="/videocall" element={<UserVideoCallPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
