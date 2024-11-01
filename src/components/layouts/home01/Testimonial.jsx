import React, { Component } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import testimonialImg1 from '../../../assets/images/testimonial/001.jpg';
import testimonialImg2 from '../../../assets/images/testimonial/002.jpg';
import testimonialImg3 from '../../../assets/images/testimonial/003.jpg';
import testimonialImg4 from '../../../assets/images/testimonial/004.jpg';
class Testimonial extends Component {
    // import ""
    constructor(props) {
        super(props);
        this.state = {
            testimonial: [
                {
                    id: 1,
                    img: testimonialImg1,
                    alt: 'images',
                    text01: 'It was a pleasure to work together with Shubham on many college projects,  ',
                    text02: 'who is an outstanding Full Stack Developer at GAMMASTACK. Thanks to interpersonal ',
                    text03: 'skills he has great relations with team members. He is always capable ',
                    text04: 'of adapting to new working environments. Shubham worked far beyond the call of duty. ',
                    text05: 'He is a reliable person and I will always hold him in the highest esteem.',
                    name: 'Kajal Rajwade',
                    company: '- Solution Engineer at ex-Gammastack',
                },


                {
                    id: 2,
                    img: testimonialImg2,
                    alt: 'images',
                    text01: 'Shubham has been a good teammate at microverse, he doesnot hesitate to help ',
                    text02: 'people when having doubts or questions. Aside from that, he is also a good software developer. ',
                    text03: 'He has completed every single project as fast and well done as possible.',
                    name: 'Luis Octavio Ramirez Cruz',
                    company: '- Full-stack Developer : Microverse ',
                    classname: 'testimonial-t1 text-center'
                },
                {
                    id: 3,
                    img: testimonialImg3,
                    alt: 'images',
                    text01: 'So far a few people have had the opportunity of working with a helpful ',
                    text02: 'and efficient team mate - but I had the chance when I partnered with ',
                    text03: 'Shubham on a few projects. He is always on top of everything and works quicker ',
                    text04: 'than anybody I have come across. He improves any team he joins ',
                    text05: 'and it would be great working with him again.',
                    name: 'Nakitto Catherine',
                    company: '- Full-stack Developer : Microverse',
                    classname: 'testimonial-t1 text-center'
                },
                {
                    id: 4,
                    img: testimonialImg4,
                    alt: 'images',
                    text01: 'We got to know with Raj when he joined Microverse, I was assigned to be his mentor ',
                    text02: 'but we didnot progress because he switched to another timezone. I remember one day ',
                    text03: 'he reached out to me, he needed help, I asked him to give me some minutes.',
                    text04: ' When I was available he had just solved the problem, I was so impressed with his solution, ',
                    text05: 'he is a talented guy and when he is stuck he is ready to ask for help.',
                    name: 'Theophile Kango',
                    company: '- Full-stack Developer : Microverse',
                    classname: 'testimonial-t1 text-center'
                }
            ]
        }
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true, // Enable next/previous arrows
            prevArrow: <div className="slick-arrow prev-arrow">{'<'}</div>,
            nextArrow: <div className="slick-arrow next-arrow">{'>'}</div>,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <div className="testimonial-container">
                <Slider {...settings}>
                    {
                        this.state.testimonial.map(data => (
                            <div className="testimonial-item" key={data.id}>
                                <div className="avatar-container">
                                    <img src={data.img} alt={data.alt} className="avatar" />
                                </div>
                                <p className="testimonial-text">
                                    {data.text01}<br /> {data.text02} <br />{data.text03}<br />{data.text04}<br />{data.text05}
                                </p>
                                <h3 className="name">{data.name}</h3>
                                <h4 className="company">{data.company}</h4>
                            </div>
                        ))
                    }
                </Slider>

                {/* Responsive CSS */}
                <style>
                    {`
                        .testimonial-container {
                            width: 100%;
                            max-width: 1200px;
                            margin: 0 auto;
                            padding: 20px;
                            box-sizing: border-box;
                        }

                        .testimonial-item {
                            width: 80vw; /* 80% of the viewport width */
                            max-width: 1500px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f9f9f9;
                            border-radius: 8px;
                            text-align: center;
                        }

                        .avatar-container {
                            display: flex;
                            justify-content: center;
                            margin-bottom: 20px;
                        }

                        .avatar {
                            width: 80px;
                            height: 80px;
                            border-radius: 50%;
                        }

                        .testimonial-text {
                            font-size: 1rem;
                            line-height: 1.5;
                            color: #333;
                            
                            margin: 0 auto;
                            padding: 0 10px; /* Add padding for better alignment */
                            max-width: 90%; /* Center the justified text */
                        }

                        .name {
                            font-size: 1.1rem;
                            color: #444;
                            margin-bottom: 5px;
                        }

                        .company {
                            font-size: 0.9rem;
                            color: #888;
                        }

                        /* Slick carousel arrow customization */
                        .slick-arrow {
                            font-size: 2rem;
                            color: #333;
                            opacity: 0.75;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            cursor: pointer;
                            z-index: 1;
                        }

                        .prev-arrow {
                            left: -40px;
                        }

                        .next-arrow {
                            right: -40px;
                        }

                        /* Adjustments for smaller screens */
                        @media (max-width: 1200px) {
                            .testimonial-item {
                                max-width: 900px;
                            }
                        }

                        @media (max-width: 992px) {
                            .testimonial-item {
                                max-width: 700px;
                            }

                            .slick-arrow {
                                font-size: 1.5rem;
                            }

                            .prev-arrow {
                                left: 10px;
                            }

                            .next-arrow {
                                right: 10px;
                            }
                        }

                        @media (max-width: 768px) {
                            .testimonial-item {
                                width: 90vw;
                                padding: 15px;
                            }

                            .testimonial-text {
                                font-size: 0.9rem;
                                max-width: 100%;
                            }

                            .name {
                                font-size: 1rem;
                            }

                            .company {
                                font-size: 0.85rem;
                            }

                            .slick-arrow {
                                font-size: 1.2rem;
                            }
                        }

                        @media (max-width: 480px) {
                            .testimonial-item {
                                padding: 10px;
                            }

                            .testimonial-text {
                                font-size: 0.85rem;
                                max-width: 100%;
                            }

                            .name {
                                font-size: 0.95rem;
                            }

                            .company {
                                font-size: 0.8rem;
                            }

                            .slick-arrow {
                                font-size: 1rem;
                                left: 5px;
                                right: 5px;
                            }
                        }
                    `}
                </style>
            </div>
        );
    }
}

export default Testimonial;
