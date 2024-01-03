import React from "react";
import "./MainWrapper.css";

interface props {
  children: React.ReactNode;
}

function MainWrapper({ children }: props) {
  return <div className="main-wrapper">{children}</div>;
}

export default MainWrapper;
