import React, { useReducer } from "react";
import "../Contact Components/ContactDescription.css";
import contactUs from "../../Images/undraw_contact_us.svg";
import Button from "../../Main Components/Button";
import warning from "../../Icons/icons8-warning.png";

interface contactState {
  firstName: string;
  lastName: string;
  email: string;
  issue: string;
  inputIsNotValid: boolean;
  message: string;
}

interface contactAction {
  type: string;
  payload: string;
}

function reducer(state: contactState, action: contactAction): contactState {
  if (action.type === "firstname") {
    return {
      ...state,
      firstName: action.payload,
    };
  }
  if (action.type === "lastname") {
    return {
      ...state,
      lastName: action.payload,
    };
  }
  if (action.type === "email") {
    return {
      ...state,
      email: action.payload,
    };
  }
  if (action.type === "issue") {
    return {
      ...state,
      issue: action.payload,
    };
  }
  if (action.type === "validName") {
    return {
      ...state,
      inputIsNotValid: true,
      message: action.payload,
    };
  }
  if (action.type === "validEmail") {
    return {
      ...state,
      inputIsNotValid: true,
      message: action.payload,
    };
  }
  if (action.type === "validIssue") {
    return {
      ...state,
      inputIsNotValid: true,
      message: action.payload,
    };
  } else {
    return state;
  }
}

function ContactDescription() {
  const initialState: contactState = {
    firstName: "",
    lastName: "",
    email: "",
    issue: "",
    inputIsNotValid: false,
    message: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function firstnameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "firstname", payload: event.target.value });
  }
  function lastnameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "lastname", payload: event.target.value });
  }
  function emailHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "email", payload: event.target.value });
  }
  function issueHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({ type: "issue", payload: event.target.value });
  }

  function submitContactForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (state.firstName.trim().length < 3) {
      dispatch({ type: "validName", payload: "Please enter a valid name" });
      return;
    }
    if (!state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      dispatch({ type: "validEmail", payload: "Please enter a valid email" });
      return;
    }
    if (state.issue.trim().length < 10) {
      dispatch({ type: "validIssue", payload: "Please type a message" });
      return;
    }

    const data = {
      firtname: state.firstName,
      lastname: state.lastName,
      email: state.email,
      issue: state.issue,
    };

    console.log(data);

    dispatch({ type: "firstname", payload: "" });
    dispatch({ type: "lastname", payload: "" });
    dispatch({ type: "email", payload: "" });
    dispatch({ type: "issue", payload: "" });
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
            {state.inputIsNotValid && (
              <div className="warning-message">
                <img src={warning} alt="warning" />
                <span>{state.message}</span>
              </div>
            )}
            <form onSubmit={submitContactForm}>
              <div className="name-inputs">
                <input
                  placeholder="Enter your firstname"
                  className="firstname"
                  onChange={firstnameHandler}
                  value={state.firstName}
                />
                <input
                  placeholder="Enter your lastname"
                  className="lastname"
                  onChange={lastnameHandler}
                  value={state.lastName}
                />
              </div>
              <input
                placeholder="Enter your email"
                type={"text"}
                className="email-input"
                onChange={emailHandler}
                value={state.email}
              />
              <textarea
                placeholder="Describe your issue"
                className="text-area"
                onChange={issueHandler}
                value={state.issue}
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
