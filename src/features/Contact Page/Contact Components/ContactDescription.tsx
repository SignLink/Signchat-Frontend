import React, { useReducer } from "react";
import "../Contact Components/ContactDescription.css";
import contactUs from "../../../assets/Images/contact_us.svg";
import Button from "../../../components/Button";
import WarningMessage from "../../../components/WarningMessage";

interface contactState {
  firstName: string;
  lastName: string;
  email: string;
  issue: string;
  inputIsNotValid: boolean;
  firstnameNotValid: boolean;
  emailNotValid: boolean;
  issueNotValid: boolean;
  message: string;
}

interface contactAction {
  type: string;
  payload: any;
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
  }
  if (action.type === "inputNotValid") {
    return {
      ...state,
      inputIsNotValid: action.payload,
    };
  }
  if (action.type === "firstnameNotValid") {
    return {
      ...state,
      firstnameNotValid: action.payload,
    };
  }
  if (action.type === "emailNotValid") {
    return {
      ...state,
      emailNotValid: action.payload,
    };
  }
  if (action.type === "issueNotValid") {
    return {
      ...state,
      issueNotValid: action.payload,
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
    firstnameNotValid: false,
    emailNotValid: false,
    issueNotValid: false,
    message: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const validFirstname = state.firstName.trim().length < 2;
  const validEmail = !state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const validIssue = state.issue.trim().length < 10;

  function onFocusValidInputs(
    requirements: boolean,
    actionName: string,
    message: string
  ) {
    if (requirements) {
      dispatch({ type: actionName, payload: true });
    } else if (state.message === message) {
      dispatch({ type: "inputNotValid", payload: false });
      dispatch({ type: actionName, payload: false });
    } else {
      dispatch({ type: actionName, payload: false });
    }
  }

  function firstnameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "firstname", payload: event.target.value });
    onFocusValidInputs(
      validFirstname,
      "firstnameNotValid",
      "Please enter a valid name"
    );
  }
  function lastnameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "lastname", payload: event.target.value });
  }
  function emailHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "email", payload: event.target.value });
    onFocusValidInputs(
      validEmail,
      "emailNotValid",
      "Please enter a valid email"
    );
  }
  function issueHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({ type: "issue", payload: event.target.value });
    onFocusValidInputs(validIssue, "issueNotValid", "Please type a message");
  }

  //submit form
  function submitContactForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (validFirstname) {
      dispatch({ type: "validName", payload: "Please enter a valid name" });
      return;
    }
    if (validEmail) {
      dispatch({ type: "validEmail", payload: "Please enter a valid email" });
      return;
    }
    if (validIssue) {
      dispatch({ type: "validIssue", payload: "Please type a message" });
      return;
    }

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
              <WarningMessage warningMessage={state.message} />
            )}
            <form onSubmit={submitContactForm}>
              <div className="name-inputs">
                <input
                  placeholder="Enter your firstname"
                  className={
                    state.firstnameNotValid ? "firstname-invalid" : "firstname"
                  }
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
                className={
                  state.emailNotValid ? "email-input-invalid" : "email-input"
                }
                onChange={emailHandler}
                value={state.email}
              />
              <textarea
                placeholder="Describe your issue"
                className={
                  state.issueNotValid ? "text-area-invalid" : "text-area"
                }
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
