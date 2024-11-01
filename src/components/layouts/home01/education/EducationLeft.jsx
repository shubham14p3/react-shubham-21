import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import image11 from '../../../../assets/images/section/11.png';
class EducationLeft extends Component {
    render() {
        return (
            <div className="col-left">
                <div className="flat-spacer" data-desktop={97} data-mobile={0} data-smobile={0} />
                <div className="featured-post position-relative animate-element wow delay5 fadeInUp" data-wow-delay="0.5s">
                    <img src={image11} alt="images" />
                    <div className="flat-spacer" data-desktop={0} data-mobile={0} data-smobile={30} />
                    <div className="">
                        <Link to="https://www.facebook.com/shubham14p3" className="color-s1"><i className="fa fa-facebook" aria-hidden="true" /></Link>
                        <Link to="https://www.linkedin.com/in/shubham14p3/" className="color-s2"><i className="fa fa-linkedin" aria-hidden="true" /></Link>
                        <Link to="https://github.com/shubham14p3" className="color-s3"><i className="fa fa-github" aria-hidden="true" /></Link>                        
                    </div>
                </div>
            </div>
        );
    }
}

export default EducationLeft;
