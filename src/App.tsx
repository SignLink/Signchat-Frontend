import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./Home Page/Home";
import About from "./About Page/About";
import Contact from "./Contact Page/Contact";
import UserChatPage from "./User Chat Page/UserChatPage";
import UserFriendsPage from "./User Friends Page/UserFriendsPage";
import UserSchedulePage from "./User Schedule Page/UserSchedulePage";
import UserSettingsPage from "./User Settings Page/UserSettingsPage";
import UserVideoCallPage from "./User Video Call Page/UserVideoCallPage";
import { useDispatch, useSelector } from "react-redux";
import InvalidPage from "./Main Components/InvalidPage";
import UserActiveVideoCall from "./User Video Call Page/User Video Call Components/UserActiveVideoCall";
import { setUserInfo } from "./Store-Redux/AuthReducer";

function App() {
  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.authentication.token);
  const userIsLoggedIn = !!userToken;
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  //lobby details
  const lobbyRoomName = useSelector((state: any) => state.lobby.lobbyRoomName);


    useEffect(() => {
      const storedEmail = localStorage.getItem("userEmail");
      if (storedEmail) {
        dispatch(setUserInfo(storedEmail));
      }
    }, [dispatch]);
  return (
    <>
      <Router>
        <Routes>
          <>
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to={"/videocall"} /> : <Home />}
            />
            <Route
              path="/about"
              element={isLoggedIn ? <Navigate to={"/videocall"} /> : <About />}
            />
            <Route
              path="/contact"
              element={
                isLoggedIn ? <Navigate to={"/videocall"} /> : <Contact />
              }
            />
          </>
          {userIsLoggedIn && (
            <>
              <Route path={`/chat`} element={<UserChatPage />} />
              <Route path="/friends" element={<UserFriendsPage />} />
              <Route path="/schedule" element={<UserSchedulePage />} />
              <Route path="/settings" element={<UserSettingsPage />} />
              <Route path="/videocall" element={<UserVideoCallPage />} />
              <Route
                path={`/videocall?room=${lobbyRoomName}`}
                element={<UserActiveVideoCall />}
              />
            </>
          )}
          <Route path="*" element={<InvalidPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
