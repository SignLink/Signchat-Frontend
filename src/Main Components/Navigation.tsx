import "./Navigations.css";
import logo from '../Images/logo.svg'
import Button from "./Button";


function Navigation() {
  return (
    <>
      <div className="navigation-main">
        <div className="main-logo">
            <img src={logo} alt="main-logo" />
        </div>
        <div className="nav-buttons">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
          <Button buttonName="Login"/>
        </div>
      </div>
    </>
  );
}

export default Navigation;
