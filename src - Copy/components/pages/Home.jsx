import React from "react";
// eslint-disable-next-line
import {
  Header,
  Banner,
  Testimonial,
  ShapeIcon,
  About,
  Specilizing,
  Education,
  Footer,
} from "../layouts/home01/index";

// Import images
import shapeImage1 from "../../assets/images/testimonial/01.png";
import shapeImage2 from "../../assets/images/testimonial/02.png";
import shapeImage3 from "../../assets/images/testimonial/03.png";
import shapeImage4 from "../../assets/images/testimonial/04.png";
import shapeImage5 from "../../assets/images/testimonial/05.png";
import shapeImage6 from "../../assets/images/testimonial/06.png";

const Home = () => {
  const shapeicon = [
    {
      id: 1,
      classname: "shape-one",
      images: shapeImage1, // Use the imported variable
      alt: "images",
    },
    {
      id: 2,
      classname: "shape-two",
      images: shapeImage2,
      alt: "images",
    },
    {
      id: 3,
      classname: "shape-three",
      images: shapeImage3,
      alt: "images",
    },
    {
      id: 4,
      classname: "shape-four",
      images: shapeImage4,
      alt: "images",
    },
    {
      id: 5,
      classname: "shape-five",
      images: shapeImage5,
      alt: "images",
    },
    {
      id: 6,
      classname: "shape-six",
      images: shapeImage6,
      alt: "images",
    },
  ];

  return (
    <div className="counter-scroll bg-home1 has-one-page">
      <div id="mobile-menu-overlay">
        <span className="tf-close"></span>
      </div>
      <Header />
      <div id="content" className="content">
        <div className="homepage-personal">
          <Banner />
          <div className="section slide-personal-Intro-second slide-dark bg-white">
            <section className="profile s1">
              <div className="container" id="about">
                <About />
              </div>
            </section>
          </div>
          <Specilizing />
          <Education />
        </div>

        <div className="section slide-personal-Intro-second slide-dark">
          <section className="testimonial s1 shape-am" id="recommendations">
            {shapeicon.map((data) => (
              <ShapeIcon key={data.id} data={data} />
            ))}
            <div
              className="animate-element wow delay5 fadeZooming"
              data-wow-delay="0.5s"
            >
              <h2 className="text-client-love">LinkedIn Recommendations</h2>
            </div>
            <Testimonial />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
