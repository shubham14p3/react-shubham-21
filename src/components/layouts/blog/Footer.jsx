import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer id="footer" className="footer footer-s1">
                <div id="footer-widget" className="footer-widget-s4 footer-widget-line bg-s1 position-relative">
                    <div className="container">
                        <div className="widget-text text-center">
                            <h3 className="widget-title small lt-sp06 mg-b63 text-white">Stay Connected</h3>
                            <p className="address mg-b2 text-white">Jamshedpur, India</p>
                            <p className="email mg-b5 text-white">shubham14p3@gmail.com</p>
                            <p className="phone mg-b53 text-white">+91 80927 66575</p>
                            <div className="site-list site-list-pdl text-center d-flex justify-content-center">
                                <Link to="#" className="bg-s1"><i className="fa fa-facebook" aria-hidden="true" /></Link>
                                <Link to="#" className="bg-s2"><i className="fa fa-linkedin" aria-hidden="true" /></Link>
                                <Link to="#" className="bg-s3"><i className="fa fa-whatsapp" aria-hidden="true" /></Link>
                                <Link to="#" className="bg-s4"><i className="fa fa-github" aria-hidden="true" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="bottom" className="bottom-s4">
                    <div className="container">
                        <div className="row align-items-center text-center text-lg-start">
                            <div className="col-lg-4 col-12">
                                <div className="copyright lt-sp02">
                                    © 2024 - Shubham Raj, All rights reserved.
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <ul className="widget-nav-menu color-s1 d-flex justify-content-center justify-content-lg-start">
                                    <li><Link to="#">Home</Link></li>
                                    <li><Link to="#">Portfolio</Link></li>
                                    <li><Link to="#">About</Link></li>
                                    <li><Link to="#">Contact</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-12">
                                <div className="socials-list color-s1 d-flex justify-content-center justify-content-lg-end">
                                    <Link to="#"><i className="fa fa-facebook" aria-hidden="true" /></Link>
                                    <Link to="#"><i className="fa fa-linkedin" aria-hidden="true" /></Link>
                                    <Link to="#"><i className="fa fa-whatsapp" aria-hidden="true" /></Link>
                                    <Link to="#"><i className="fa fa-github" aria-hidden="true" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inline CSS or external styles */}
                <style>
                    {`
                        .widget-nav-menu {
                            list-style: none;
                            padding: 0;
                            margin: 0;
                        }
                        
                        .widget-nav-menu li {
                            display: inline-block;
                            margin: 0 10px;
                        }

                        .socials-list a, .site-list a {
                            margin: 0 8px;
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            color: white;
                            background-color: #333; /* Customize color as needed */
                        }

                        /* Responsive adjustments */
                        @media (max-width: 768px) {
                            .site-list, .site-list-pdl {
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                                gap: 10px;
                                flex-wrap: nowrap;
                            }

                            .widget-nav-menu {
                                flex-direction: column;
                                padding: 10px 0;
                            }

                            .widget-nav-menu li {
                                margin: 5px 0;
                            }
                        }
                    `}
                </style>
            </footer>
        );
    }
}

export default Footer;
