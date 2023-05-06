import React from "react";
import '../Contact Components/ContactDescription.css'
import contactUs from '../../Images/undraw_contact_us.svg'

function ContactDescription() {
  return (
    <>
      <div className="contact-main">
        <h1>Get in touch with us</h1>
        <p>
          Feel free to get in touch with us through our contact form. We will
          answer your questions and problems
        </p>
        <div className="inputs-main">
          <div className="inputs">
            <div className="name-inputs">
              <input placeholder="Enter your firstname" className="firstname"/>
              <input placeholder="Enter your lastname" className="lastname"/>
            </div>
            <input
              placeholder="Enter your email"
              type={"email"}
              className="email-input"
            />
            <textarea placeholder="Describe your issue" className="text-area" />
          </div>
          <div className="inputs-image">
            <img src={contactUs} alt="contact"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactDescription;
