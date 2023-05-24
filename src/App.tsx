import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home Page/Home";
import About from "./About Page/About";
import Contact from "./Contact Page/Contact";
import UserChatPage from "./User Chat Page/UserChatPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/chat" element={<UserChatPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
