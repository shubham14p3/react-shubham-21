import React from "react";
import ReactSlick from "react-slick";

const Slider = ReactSlick.default || ReactSlick;

import testimonialImg1 from "../../../assets/images/testimonial/001.jpg";
import testimonialImg2 from "../../../assets/images/testimonial/002.jpg";
import testimonialImg3 from "../../../assets/images/testimonial/003.jpg";
import testimonialImg4 from "../../../assets/images/testimonial/004.jpg";

const testimonials = [
  {
    id: 1,
    img: testimonialImg1,
    name: "Kajal Rajwade",
    company: "Solution Engineer at ex-Gammastack",
    text: "Shubham consistently worked beyond expectations. He adapted quickly to changing environments, stayed reliable under pressure, and always delivered strong support to the team.",
  },
  {
    id: 2,
    img: testimonialImg2,
    name: "Luis Octavio Ramirez Cruz",
    company: "Full-stack Developer · Microverse",
    text: "Shubham was a strong teammate who never hesitated to help others. He completed projects efficiently and showed clear software development strength throughout the collaboration.",
  },
  {
    id: 3,
    img: testimonialImg3,
    name: "Nakitto Catherine",
    company: "Full-stack Developer · Microverse",
    text: "He was helpful, efficient, and extremely quick in execution. Shubham improved the team dynamic and consistently stayed on top of deliverables.",
  },
  {
    id: 4,
    img: testimonialImg4,
    name: "Theophile Kango",
    company: "Full-stack Developer · Microverse",
    text: "Shubham is talented, proactive, and knows when to ask for help. His ability to solve problems quickly and independently stood out strongly.",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  responsive: [
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function Testimonial() {
  return (
    <section id="recommendations" className="section-shell section-anchor">
      <div className="container-shell">
        <div className="section-title-wrap">
          <div className="section-eyebrow">Recommendations</div>
          <h2 className="section-title">What people say about working with me.</h2>
        </div>

        <div className="testimonial-slider">
          <Slider {...settings}>
            {testimonials.map((item) => (
              <div key={item.id}>
                <article className="testimonial-card glass-card">
                  <div className="testimonial-card__top">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="testimonial-card__avatar"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="testimonial-card__name">{item.name}</h3>
                      <div className="testimonial-card__company">{item.company}</div>
                    </div>
                  </div>

                  <p className="testimonial-card__text">“{item.text}”</p>
                </article>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}