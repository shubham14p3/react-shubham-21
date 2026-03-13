import React from 'react';

// Import SVG icons
import linkedinIcon from '../../../assets/icon/linkedin.svg';
import githubIcon from '../../../assets/icon/github.svg';
import hackerrankIcon from '../../../assets/icon/hackerrank.svg';
import skypeIcon from '../../../assets/icon/skype.svg';
import facebookIcon from '../../../assets/icon/facebook.svg';
import image03 from '../../../assets/images/section/03.png';

const About = () => {
    const profileLinks = [
        {
            id: 1,
            classname: 'profile-link border-corner2 d-flex align-items-center',
            images: linkedinIcon, // Use the imported variable
            alt: 'Linkedin',
            url: 'https://www.linkedin.com/in/shubham14p3/',
            name: 'Linkedin',
            normal: 'Get in Touch'
        },
        {
            id: 2,
            classname: 'profile-link border-corner2 d-flex align-items-center',
            images: githubIcon,
            alt: 'Github',
            url: "https://github.com/shubham14p3",
            name: 'Github',
            normal: 'See My Work'
        },
        {
            id: 3,
            classname: 'profile-link border-corner2 d-flex align-items-center',
            images: hackerrankIcon,
            alt: 'HackerRank',
            url: "https://www.hackerrank.com/shubham14p3?hr_r=1",
            name: 'HackerRank',
            normal: 'My Skills'
        },
        {
            id: 4,
            classname: 'profile-link border-corner2 d-flex align-items-center',
            images: skypeIcon,
            alt: 'Skype',
            url: "https://join.skype.com/invite/UbpHpl5nupqt",
            name: 'Skype',
            normal: 'Connect with Me'
        },
        {
            id: 5,
            classname: 'profile-link border-corner2 d-flex align-items-center',
            images: facebookIcon,
            alt: 'Facebook',
            url: "https://www.facebook.com/shubham14p3/",
            name: 'Facebook',
            normal: 'Connect with Me'
        }
    ];

    return (
        <div className="background-white" style={{ textAlign: 'justify' }}>
            <div className="d-lg-flex">
                <div className="col-left">
                    <div className="featured-post animate-element wow delay5 fadeInUp" data-wow-delay="0.5s">
                        <img src={image03} alt="Profile" className="img-about" />
                    </div>
                    <div className="profile-list">
                        <div className="flat-carousel-box data-effect clearfix" data-gap="30" data-column="4" data-column2="3" data-column3="2" data-column4="1" data-column5="1" data-dots="false" data-auto="false" data-nav="false" data-loop="true">
                            <div className="owl-carousel">
                                {profileLinks.map(data => (
                                    <div className={data.classname} key={data.id}>
                                        <div className="featured-post">
                                            <a
                                                href={data.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img src={data.images} width="50px" height="50px" alt={data.alt} />
                                            </a>
                                        </div>
                                        <div className="content-inside">
                                            <h3 className="name">
                                                <a
                                                    href={data.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >{data.name}</a></h3>
                                            <span className="t-normal">{data.normal}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-right">
                    <div className="flat-spacer" data-desktop="105" data-mobile="50" data-smobile="50"></div>
                    <div className="flat-title t1">
                        <div className="animate-element wow delay5 fadeInDown" data-wow-delay="0.5s">
                            <h4 className="sub-title mg-b22">About Me</h4>
                            <h2 className="title-section mg-b26 color-d12">Hi, I am Shubham <span className="color-d4">,</span></h2>
                            <p style={{ textAlign: 'justify' }}>
                                I am a seasoned React developer with over 4.5+ years of expertise, currently contributing to frontend initiatives at Capgemini. My career journey includes pivotal roles at Nagravision and Gammastack.
                                <br /><br /> I excel in crafting pixel-perfect user interfaces using React.js, Redux for state management, and integrating cutting-edge technologies such as Next.js and Material-UI for scalable applications.
                                <br /><br /> At Capgemini, I lead frontend development for Discover Bank, driving high-performance applications in the Financial Services domain and achieving heightened client satisfaction.
                                <br /><br />  My proficiency extends to optimizing React components for cross-browser compatibility and performance, conducting rigorous code reviews, and implementing Agile methodologies to enhance team productivity and project outcomes.
                                <br /><br /> I thrive in collaborative environments, leveraging tools like Git, Jenkins for CI/CD pipelines, and AWS for cloud deployments to deliver seamless solutions. Passionate about continuous learning, I hold a strong foundation in JavaScript, HTML5, CSS3, and Bootstrap, underpinning my ability to innovate and deliver impactful digital experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
