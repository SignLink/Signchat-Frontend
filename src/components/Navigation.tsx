import "./Navigations.css";
import logo from "../assets/Images/signchat-logo.svg";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openLogin } from "../store/reducers/LoginReducer";
import useResponsiveFunction from "../utilities/SmallScreen";
import { useState } from "react";
import menuButton from "../assets/Icons/menu.png";
import closeButton from "../assets/Icons/close.png";

function Navigation() {
  const dispatchModal = useDispatch();

  function openLoginPage() {
    dispatchModal(openLogin());
  }

  //responsiveness
  const { isSmallScreen } = useResponsiveFunction();
  const [openNavigation, setOpenNavigation] = useState<boolean>(false);

  return (
    <>
      <div className="navigation-main">
        <div className="main-logo">
          <img src={logo} alt="main-logo" />
        </div>
        {isSmallScreen ? (
          <>
            {openNavigation ? (
              <>
                <div className="nav-buttons">
                  <span
                    className="close-button"
                    onClick={() => setOpenNavigation(false)}
                  >
                    <img src={closeButton} alt="close" />
                  </span>
                  <span className="home-button">
                    <NavLink to="/">Home</NavLink>
                  </span>
                  <span className="about-button">
                    <NavLink to="/about">About</NavLink>
                  </span>
                  <span className="contact-button">
                    <NavLink to="/contact">Contact</NavLink>
                  </span>
                  <Button buttonName="Login" openModal={openLoginPage} />
                </div>
              </>
            ) : (
              <>
                <div
                  className="smaller-screen-nav-button"
                  onClick={() => setOpenNavigation(true)}
                >
                  <img src={menuButton} alt="menu-button" />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="nav-buttons">
              <span>
                <NavLink to="/">Home</NavLink>
              </span>
              <span>
                <NavLink to="/about">About</NavLink>
              </span>
              <span style={{ marginRight: "1rem" }}>
                <NavLink to="/contact">Contact</NavLink>
              </span>
              <Button buttonName="Login" openModal={openLoginPage} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Navigation;
