import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class About extends Component {
    constructor(props){
        super(props);
        this.state = {
            profile: [
                {
                    id: 1,
                    classname: 'profile-link border-corner2 d-flex align-items-center',
                    images: './icon/linkedin.svg',
                    alt: 'Linkedin',
                    url:'https://www.linkedin.com/in/shubham14p3/',
                    name: 'Linkedin',
                    normal: 'Get in Touch'
                },
                {
                    id: 2,
                    classname: 'profile-link border-corner2 d-flex align-items-center',
                    images: './icon/github.svg',
                    alt: 'Github',
                    url:"https://github.com/shubham14p3",
                    name: 'Github',
                    normal: 'See My Work'
                },
                {
                    id: 3,
                    classname: 'profile-link border-corner2 d-flex align-items-center',
                    images: './icon/hackerrank.svg',
                    alt: 'HackerRank',
                    url:"https://www.hackerrank.com/shubham14p3?hr_r=1",
                    name: 'HackerRank',
                    normal: 'My skills'
                },
                {
                    id: 4,
                    classname: 'profile-link border-corner2 d-flex align-items-center',
                    images: './icon/skype.svg',
                    alt: 'Skype',
                    url:"https://join.skype.com/invite/UbpHpl5nupqt",
                    name: 'Skype',
                    normal: 'Connect with me'
                },
                {
                    id: 5,
                    classname: 'profile-link border-corner2 d-flex align-items-center',
                    images: './icon/facebook.svg',
                    alt: 'Facebook',
                    url:"https://www.facebook.com/shubham14p3/",
                    name: 'Facebook',
                    normal: 'Connect with me'
                }
            ]
        }
    }
    render() {
        return (
            <div className="background-white">
                <div className="d-lg-flex">
                    <div className="col-left">
                        <div className="featured-post animate-element wow delay5 fadeInUp" data-wow-delay="0.5s">
                            <img src="images/section/03.png" alt="images"/>
                        </div>
                    </div>
                    <div className="col-right">
                        <div className="flat-spacer" data-desktop="105" data-mobile="50" data-smobile="50"></div>
                        <div className="flat-title t1">
                            <div className="animate-element wow delay5 fadeInDown" data-wow-delay="0.5s">
                                <h4 className="sub-title mg-b22">About Me</h4>
                                <h2 className="title-section mg-b26 color-d12">Hi, I am Shubham <span className="color-d4">,</span></h2>
                                <p>
                                My core competency is that of a developer. I specialize in React developing front-end user interface. My primary responsibility include working with cross functional dev team and product team to convert designed wire-frames into website elements and create new functionalities.  
                                <br/><br/> I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between. My goal is to always build products that provide pixel-perfect, performance experiences.
                                <br/><br/>As a developer, I have learned various technologies and worked on diffent stack on a daily basis.
                                </p>
                            </div>                          
                        </div>
                    </div>
                </div>
                <div className="profile-list">
                    <div className="flat-carousel-box data-effect clearfix" data-gap="30" data-column="4" data-column2="3" data-column3="2" data-column4="1" data-column5="1" data-dots="false" data-auto="false" data-nav="false" data-loop="true">
                        <div className="owl-carousel">
                            {
                                this.state.profile.map(data => (
                                    <div className={data.classname} key={data.id}>
                                        <div className="featured-post">
                                            <img src={data.images} width="50px" height="50px" alt={data.alt}/>
                                        </div>
                                        <div className="content-inside">
                                            <h3 className="name">
                                            <a
                                            href={data.url}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            >{data.name}</a></h3>
                                            <span className="t-normal">{data.normal}</span>
                                        </div>
                                    </div>    
                                ))
                            }                                                          
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
