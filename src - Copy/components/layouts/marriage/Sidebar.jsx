import React, { Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../../assets/images/pp/1.jpg';
import img2 from '../../../assets/images/pp/2.jpg';
import img3 from '../../../assets/images/pp/3.jpg';
import img4 from '../../../assets/images/pp/4.jpg';
import img5 from '../../../assets/images/pp/5.jpg';
import img6 from '../../../assets/images/pp/6.jpg';
import img7 from '../../../assets/images/pp/7.jpg';
import img8 from '../../../assets/images/pp/8.jpg';
import img9 from '../../../assets/images/pp/9.jpg';
import img10 from '../../../assets/images/pp/10.jpg';
import img11 from '../../../assets/images/pp/11.jpg';
import img12 from '../../../assets/images/pp/12.jpg';
import img13 from '../../../assets/images/pp/13.jpg';
import img14 from '../../../assets/images/pp/14.jpg';
import img15 from '../../../assets/images/pp/15.jpg';

class Sidebar extends Component {
    // Custom Previous Arrow
    PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "-25px",
                    width: "30px",
                    height: "30px",
                    border: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "18px",
                    color: "#333",
                    zIndex: "1",
                }}
            >
                &#60;
            </div>
        );
    };

    // Custom Next Arrow
    NextArrow = (props) => {
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "-25px",
                    width: "30px",
                    height: "30px",
                    border: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "18px",
                    color: "#333",
                    zIndex: "1",
                }}
            >
                &#62;
            </div>
        );
    };

    render() {
        // Slider settings
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            vertical: true, // Enable vertical sliding
            nextArrow: <this.NextArrow />,
            prevArrow: <this.PrevArrow />,
            responsive: [
                {
                    breakpoint: 768, // Mobile view breakpoint
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        vertical: false, // Horizontal sliding for mobile view
                    },
                },
            ],
        };

        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
                textAlign: "center",
            }}>
                <div className="sidebar" style={{
                    padding: "20px",
                    maxWidth: "300px",
                    width: "100%",
                }}>
                    {/* Title */}
                    <h3 style={{
                        fontSize: "1.5rem",
                        marginBottom: "15px",
                        color: "#333",
                        fontWeight: "600"
                    }}>
                        Photo Gallery
                    </h3>

                    {/* Slider */}
                    <Slider {...settings}>
                        <div>
                            <img
                                src={img1}
                                alt="Slide 1"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img2}
                                alt="Slide 2"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img3}
                                alt="Slide 3"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img4}
                                alt="Slide 4"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img5}
                                alt="Slide 5"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img6}
                                alt="Slide 6"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img7}
                                alt="Slide 7"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img8}
                                alt="Slide 8"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img9}
                                alt="Slide 9"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img10}
                                alt="Slide 10"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img11}
                                alt="Slide 11"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img12}
                                alt="Slide 12"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img13}
                                alt="Slide 13"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img14}
                                alt="Slide 14"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                        <div>
                            <img
                                src={img15}
                                alt="Slide 15"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

export default Sidebar;
