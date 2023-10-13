import React  from "react";
import './About.css';


function About() {
    return (
      <div className="About">
        <p>Our goal is to raise awareness on the opioid crisis through creating a one-stop web application that tracks and displays social media discourse using novel Natural Language Processing techniques. When a user goes on the website, they are greeted with a dashboard of multiple different interactive visualizations. For example, there might be a timeline of opioid related deaths. But, if they click on a certain date, they would get a graph of how happy / sad the online discourse was at that time, what the major topics were, and more.</p>
        <p>Additionally, we hope to be able to leverage existing data on rehab centers. We want a user to be able to search for centers close to them that have the service that they’re looking for. Additionally, we would be able to provide google review stars and the major topics of discussion within the reviews.</p>
      </div>
  );
}

export default About;