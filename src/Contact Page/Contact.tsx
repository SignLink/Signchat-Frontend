import React from "react";
import Navigation from "../Main Components/Navigation";
import MainWrapper from "../Main Components/MainWrapper";
import Footer from "../Main Components/Footer";
import ContactDescription from "./Contact Components/ContactDescription";

function Contact() {
  return (
    <>
      <MainWrapper>
        <Navigation />
        <ContactDescription/>
      </MainWrapper>
      <Footer />
    </>
  );
}

export default Contact;
