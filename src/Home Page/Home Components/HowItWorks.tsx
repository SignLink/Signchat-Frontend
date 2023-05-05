import React from "react";
import "../Home Components/HowItWorks.css";
import laptopimg from "../../Images/pexels-cottonbro-studio.svg";

const howItWorksDescriptions = [
  {
    title: "Choose User Type",
    description: "Select whether you are deaf or not deaf when signing up",
  },
  {
    title: "Start Video Chat",
    description:
      "Select the video chat option and initiate a call. You now have the option to use the video chat feature to communicate using either with or without sign language in real-time.",
  },
  {
    title: "Send Messages",
    description: "Send text-based messages to other users.",
  },
];

function HowItWorks() {
  return (
    <>
      <div className="how-it-works-main">
        <h1>How It Works</h1>
        <div className="how-it-works-descriptions">
          <div className="how-it-works-img">
            <img src={laptopimg} alt="laptop-img" />
          </div>
          <div className="how-it-works-descriptions-main">
            {howItWorksDescriptions.map((data, index) => {
              return (
                <div className="how-it-works-description" key={index}>
                  <h2>{data.title}</h2>
                  <p>{data.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default HowItWorks;
