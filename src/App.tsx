import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./features/Home Page/Home";
import About from "./features/About Page/About";
import Contact from "./features/Contact Page/Contact";
import UserVideoCallPage from "./features/User Video Call Page/UserVideoCallPage";
import { useDispatch, useSelector } from "react-redux";
import InvalidPage from "./components/InvalidPage";
import UserActiveVideoCall from "./features/User Video Call Page/User Video Call Components//UserActiveVideoCall";
import { setUserInfo } from "./store/reducers/AuthReducer";

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
