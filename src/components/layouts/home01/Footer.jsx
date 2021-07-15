import React, { Component } from 'react';
// eslint-disable-next-line
import {Link} from 'react-router-dom'
class Footer extends Component {

    render() {
        const getCurrentYear = () => {
            return new Date().getFullYear();
          };
        return (          
            <div className="section slide-personal-Intro-sixth slide-dark" id="contact">                
                <footer id="footer" className="footer footer-s1 footer-s1-home1">
                    <div id="footer-widget" className="footer-widget-s1 footer-widget-line bg-s1 position-relative">
                    <div className="container">
                        <div className="row d-lg-flex align-items-center text-center">
                        <div className="col-lg-12">
                            <h3 className="widget-title larger lt-sp06">Stay Connected</h3>
                        </div>
                        <div className="col-lg-12">
                            <div className="widget-info">
                            <p className="address">Jamshedpur, India</p>
                            <p className="mail">shubham14p3@gmail.com</p>
                            <p className="phone">+91 80927 66575</p>
                            </div>
                        </div>
                              <div className="col-lg-12">
                            <div className="site-list site-list-pdl text-center">
                            
                            <a href="https://www.facebook.com/shubham14p3" target="_blank" rel="noreferrer noopener" className="bg-s1"><i className="fa fa-facebook" aria-hidden="true" /></a>
                            <a href="https://www.linkedin.com/in/shubham14p3/" target="_blank" rel="noreferrer noopener" className="bg-s2"><i className="fa fa-linkedin" aria-hidden="true" /></a>
                            <a href="https://github.com/shubham14p3" target="_blank" rel="noreferrer noopener" className="bg-s3"><span className="fa fa-github" /></a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div id="bottom" className="bottom-s1">
                    <div className="container d-lg-flex justify-content-between">
                        <div className="copyright lt-sp02">
                        © {getCurrentYear()} - Shubham Raj, All rights reserved.
                        </div>
                        <div className="socials-list color-s1">
                                      
                        <a href="https://www.facebook.com/shubham14p3" target="_blank" rel="noreferrer noopener" ><i className="fa fa-facebook" aria-hidden="true" /></a>
                            <a href="https://www.linkedin.com/in/shubham14p3/" target="_blank" rel="noreferrer noopener" ><i className="fa fa-linkedin" aria-hidden="true" /></a>
                            <a href="https://github.com/shubham14p3" target="_blank" rel="noreferrer noopener" ><span className="fa fa-github" /></a> </div>
                    </div>
                    </div>
                </footer>             
            </div>
        );
    }
}

export default Footer;
