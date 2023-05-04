import React from "react";
import Navigation from "../Main Components/Navigation";
import Introduction from "./Home Components/Introduction";
import Descriptions from "./Home Components/Descriptions";
import MainWrapper from "../Main Components/MainWrapper";

function Home() {
  return (
    <>
      <MainWrapper>
        <Navigation />
        <Introduction />
        <Descriptions />
      </MainWrapper>
    </>
  );
}

export default Home;
