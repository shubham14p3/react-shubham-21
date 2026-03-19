import React, { useState } from "react";
import ReactSlick from "react-slick";
import "./testimonial.css";
import TestimonialCard from "./TestimonialCard";
import TestimonialModal from "./TestimonialModal";
import testimonialsData from "./testimonialsData";

const Slider = ReactSlick.default || ReactSlick;

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 550,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: false,
  pauseOnHover: true,
  adaptiveHeight: false,
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
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  return (
    <>
      <section id="recommendations" className="section-shell section-anchor">
        <div className="container-shell">
          <div className="section-title-wrap">
            <div className="section-eyebrow">Recommendations</div>
            <h2 className="section-title">
              What people say about working with me.
            </h2>
          </div>

          <div className="testimonial-slider">
            <Slider {...sliderSettings}>
              {testimonialsData.map((item) => (
                <div key={item.id} className="testimonial-slide">
                  <TestimonialCard
                    item={item}
                    onOpen={setSelectedTestimonial}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <TestimonialModal
        item={selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
      />
    </>
  );
}