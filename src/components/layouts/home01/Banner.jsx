import React from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="section slide-personal-Intro-first">
      <section className="banner-section s1" id="home">
        <div className="container">
          <div className="content-text position-relative">
            <div
              className="animate-element wow delay5 fadeInDown"
              data-wow-delay="0.3s"
            >
              <h1 className="cd-headline clip is-full-width title mg-b29 text-white">
                <span>Software </span>
                <span className="cd-words-wrapper color-d4">
                  <b className="is-visible">Developer!</b>
                  <b>Engineer!</b>
                </span>
              </h1>
              <bold>
                <p className="lt-sp03 mg-b60 text-white">Masterful Developer with proficiency in  &nbsp;
                  <span className="color-d4">DEVELOPING</span> web application (Front End Heavly).
                  <br />Currently working for &nbsp;
                  <span className="color-d4">Capgemini </span>, as a &nbsp;
                  <span className="color-d4"> <b>CONSULTANT</b> </span>.
                  <br />
                  I've worked for MNCs like
                  <span className="color-d4"> NAGRAVISION </span>,
                  <span className="color-d4"> MINUSOFT </span> and
                  <span className="color-d4"> GAMMASTACK </span>.
                  <br />
                  I have 5+ years of extensive experience as a developer, specializing in React and other
                  <br />  cutting-edge frameworks.
                  <br /> I design and code elegant solutions, and I am deeply passionate about my craft.
                </p>
              </bold>
            </div>
            <div
              className="animate-element wow delay5 fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="fl-btn btn-general btn-hv-border">
                <a
                  href="/resume/resume.pdf"
                  className="border-corner5 f-w500 lt-sp095 text-white "
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
