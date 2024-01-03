import React from "react";
import "./Footer.css";
import footerlogo from "../assets/Images/signchat-footer.svg";
import twitter from "../assets/Icons/icons8-twitter-50.svg";
import instagram from "../assets/Icons/icons8-instagram-50.svg";
import linkedin from "../assets/Icons/icons8-linkedin-50.svg";

function Footer() {
  return (
    <>
      <div className="footer-main">
        <div className="footer-wrapper">
          <div className="footer-social-main">
            <div className="footer-logo">
              <img src={footerlogo} alt="footer-logo" />
            </div>
            <div className="footer-social-media">
              <span>
                <img src={twitter} alt="twitter" />
              </span>
              <span>
                <img src={linkedin} alt="linkedin" />
              </span>
              <span>
                <img src={instagram} alt="instagram" />
              </span>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-links1">
              <span>About us</span>
              <span>Contact us</span>
              <span>FAQs</span>
            </div>
            <div className="footer-links2">
              <span>Terms and Conditions</span>
              <span>Support Us</span>
              <span>Feedback</span>
            </div>
          </div>
        </div>
        <footer>Copyright &copy; SignChat 2023 </footer>
      </div>
    </>
  );
}

export default Footer;
