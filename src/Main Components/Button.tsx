import React from "react";
import '../Main Components/Navigations.css'

interface props {
  buttonName: string;
}

export default function Button(props: props) {
  return (
    <>
      <button className="blue-button">{props.buttonName}</button>
    </>
  );
}
