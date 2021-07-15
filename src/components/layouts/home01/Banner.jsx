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
              <p className="lt-sp03 mg-b60 text-white">
                Masterful Developer with proficiency in
                <span className="color-d4">DEVELOPING</span> Front End UI.
                <br />Currently working for
                <span className="color-d4">Capgemini </span>, as a
                <span className="color-d4"> React developer </span>.
                <br />
                I've worked for MNC like
                <span className="color-d4"> Nagravision , Gammastack </span>,
                <br /> helped companies like
                <span className="color-d4">  Dashclick, Creant Technologies, Alco </span>
                worldwide.
                <br /> I have 1.6 years of experience as a developer and love
                working with <br />
                React and other hip frameworks.
                <br /> I design and code simple things, and I love what I do.
              </p>
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
