import React from "react";
import "../About Components/AboutUsDescription.css";
import conferenceCall from "../../Images/conference_call.svg";
import chat from "../../Images/undraw_chat.svg";
import socialInteraction from "../../Images/Social interaction.svg";

const aboutUsDescriptions = [
  {
    image: conferenceCall,
    description:
      "SignChat is a the premier online platform for real-time communication in sign language! At SignChat, we understand the importance of clear and effective communication, and we strive to provide a platform that is inclusive and accessible to all.",
  },
  {
    image: chat,
    description:
      "Our mission is to bridge the communication gap between hearing and deaf individuals, and our team is dedicated to providing a seamless and engaging user experience that empowers our users to communicate without barriers. Our platform is built on cutting-edge technology and the latest advances in machine learning, providing accurate and reliable sign language translation services to our users.",
  },
  {
    image: socialInteraction,
    description:
      "At SignChat, we are committed to creating a community of inclusion and accessibility. We believe that everyone deserves the opportunity to communicate effectively, and we are proud to be part of the movement to break down barriers and promote understanding between all individuals.",
  },
];

function AboutUsDescription() {
  return (
    <>
      <div className="description-main">
        <h1>About Us</h1>
        {aboutUsDescriptions.map(function (data, index) {
          const classNames: string =
            index % 2 === 0 ? "descriptions" : "descriptions-reverse";
          return (
            <div className={classNames} key={index}>
              <div className="description">{data.description}</div>
              <div className="description-image">
                <img src={data.image} alt="describeImage" />
              </div>
            </div>
          );
        })}
        <h2>
          Thank you for choosing SignChat, and we look forward to helping you
          communicate with ease and confidence!
        </h2>
      </div>
    </>
  );
}

export default AboutUsDescription;
