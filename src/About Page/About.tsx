import React from "react";
import Navigation from "../Main Components/Navigation";
import MainWrapper from "../Main Components/MainWrapper";
import AboutUsDescription from "./AboutUsDescription";
import Footer from "../Main Components/Footer";

function About() {
  return (
    <>
      <MainWrapper>
        <Navigation />
        <AboutUsDescription/>
      </MainWrapper>
      <Footer/>
    </>
  );
}

export default About;
