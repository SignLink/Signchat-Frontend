import React, { useReducer, useState } from "react";
import "../Contact Components/ContactDescription.css";
import contactUs from "../../Images/undraw_contact_us.svg";
import Button from "../../Main Components/Button";
import warning from "../../Icons/icons8-warning.png";


function ContactDescription() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");

  function firstnameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(event.target.value);
  }
  function lastnameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setLastName(event.target.value);
  }
  function emailHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function issueHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setIssue(event.target.value);
  }

  function submitContactForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

  }

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
            {/* {errorState.inputIsValid && (
              <div className="warning-message">
                <img src={warning} alt="warning" />
                <span>{errorState.message}</span>
              </div>
            )} */}
            <form onSubmit={submitContactForm}>
              <div className="name-inputs">
                <input
                  placeholder="Enter your firstname"
                  className="firstname"
                  onChange={firstnameHandler}
                  value={firstname}
                />
                <input
                  placeholder="Enter your lastname"
                  className="lastname"
                  onChange={lastnameHandler}
                  value={lastname}
                />
              </div>
              <input
                placeholder="Enter your email"
                type={"email"}
                className="email-input"
                onChange={emailHandler}
                value={email}
              />
              <textarea
                placeholder="Describe your issue"
                className="text-area"
                onChange={issueHandler}
                value={issue}
              />
              <div className="send-button">
                <Button buttonName="Send" />
              </div>
            </form>
          </div>
          <div className="inputs-image">
            <img src={contactUs} alt="contact" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactDescription;
