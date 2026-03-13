import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ganeshImg from '../../../assets/images/section/lordg.png'; // Add the path to your Lord Ganesh image here
import sImg from '../../../assets/images/section/sw.png'; // Add the path to your Lord Ganesh image here
import omImg from '../../../assets/images/section/om.png'; // Add the path to your Lord Ganesh image here
import './Banner.css';
class Banner extends Component {
    render() {
        return (
            <div className="page-title position-relative d-flex flex-column align-items-center">
                <div className="overlay-left" />
                <div className="overlay-right" />
                <div className="container position-relative text-center">
                    <div className="breadcrumbs">
                        <div className="breadcrumbs-wrap">
                            <div className="breadcrumbs-wrap d-flex align-items-center justify-content-center">
                                {/* Left Image */}
                                <img
                                    src={sImg}
                                    alt="Lord Ganesh Left"
                                    className="ganesh-img-small hide-on-mobile"
                                    style={{
                                        maxWidth: '80px',
                                        height: 'auto',
                                        marginRight: '20px'
                                    }}
                                />
                                {/* Center Image and Text */}
                                <div className="center-content text-center">
                                    <img
                                        src={ganeshImg}
                                        alt="Lord Ganesh Center"
                                        className="ganesh-img-large"
                                        style={{
                                            maxWidth: '200px',
                                            height: 'auto',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <h1 className="title mg-b29 text-white" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                                        श्री गणेशाय नमः
                                    </h1>
                                </div>
                                {/* Right Image */}
                                <img
                                    src={omImg}
                                    alt="Lord Ganesh Right"
                                    className="ganesh-img-small hide-on-mobile"
                                    style={{
                                        maxWidth: '80px',
                                        height: 'auto',
                                        marginLeft: '20px'
                                    }}
                                />
                            </div>
                            <ul className="breadcrumbs-inner hide-on-mobile">
                                <li><Link to="/">Home</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;
