import "../Signup.css";
import lady from "../../Images/gorgeous-smiling-female.svg";
import Button from "../../Main Components/Button";
import { NavLink } from "react-router-dom";
import { useReducer } from "react";

interface signupState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface signupAction {
  type: string;
  payload: any;
}

function reducer(state: signupState, action: signupAction): signupState {
  if (action.type === "firstname") {
    return {
      ...state,
      firstname: action.payload,
    };
  }
  if (action.type === "lastname") {
    return {
      ...state,
      lastname: action.payload,
    };
  }
  if (action.type === "email") {
    return {
      ...state,
      email: action.payload,
    };
  }
  if (action.type === "password") {
    return {
      ...state,
      password: action.payload,
    };
  }
  if (action.type === "confirmPassword") {
    return {
      ...state,
      confirmPassword: action.payload,
    };
  } else return state;
}

function SignupInputs() {
  const initialState: signupState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //onchange functions for inputs
  function firstnameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "firstname", payload: event.target.value });
  }
  function lastnameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "lastname", payload: event.target.value });
  }
  function emailHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "email", payload: event.target.value });
  }
  function passwordHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "password", payload: event.target.value });
  }
  function confirmPasswordHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "confirmPassword", payload: event.target.value });
  }

  return (
    <>
      <div className="signup-inputs-main">
        <div className="signup-inputs">
          <div>rofjrofjrojforjfor</div>
          <h1>Create An Account</h1>
          <input type="text" placeholder="Enter your firstname" />
          <input type="text" placeholder="Enter your lastname" />
          <input type="text" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your password" />
          <input type="password" placeholder="Confirm password" />
          <Button buttonName="Create Account" />
          <span>
            Already have an account? <NavLink to="/login">Login</NavLink>
          </span>
        </div>
        <div className="signup-image">
          <img src={lady} alt="lady-smiling"></img>
        </div>
      </div>
    </>
  );
}

export default SignupInputs;
