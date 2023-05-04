import React from "react";
import Navigation from "../Main Components/Navigation";
import Introduction from "./Home Components/Introduction";
import Descriptions from "./Home Components/Descriptions";
import MainWrapper from "../Main Components/MainWrapper";
import HowItWorks from "./Home Components/HowItWorks";

function Home() {
  return (
    <>
      <MainWrapper>
        <Navigation />
        <Introduction />
        <Descriptions />
        <HowItWorks/>
      </MainWrapper>
    </>
  );
}

export default Home;
