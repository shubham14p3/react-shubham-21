import React, { useEffect } from "react";
import {
  Header,
  Banner,
  About,
  Specilizing,
  Education,
  Certificate,
  Portfolio,
  Testimonial,
  Footer,
} from "../layouts/home01";
export default function Home() {
  useEffect(() => {
    // window.scrollTo(0, 0);

    document.title = "Shubham Raj | Frontend Developer Portfolio";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    meta.setAttribute(
      "content",
      "Frontend developer portfolio of Shubham Raj featuring experience, education, projects, certifications, and recommendations."
    );
  }, []);
  useEffect(() => {
    document.title = "Shubham Raj | Frontend Developer Portfolio";
  }, []);
  return (
    <div className="home-page">
      <Header />
      <main>
        <Banner />
        <About />
        <Specilizing />
        <Education />
        <Certificate />
        <Portfolio />
        <Testimonial />
      </main>
      <Footer />
    </div>
  );
}