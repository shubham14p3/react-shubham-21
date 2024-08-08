import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// eslint-disable-next-line
import {Design, NumberCount} from './specilizing/index';

class Specilizing extends Component {
    constructor(props){
        super(props);
        this.state = {
            design : [
                {
                    id: 1,
                    iconbox: 'iconbox-s1 d-sm-flex align-items-center',
                    iconcolor: 'iconbox-icon color2 color1',
                    spanicon: 'icon-designer',
                    companyTitle:'Capgemini',
                    title: 'Role: Consultant',
                    date:'Date: June 2022 - current',
                    text01: '★ Client Engagement: Spearheaded frontend development initiatives for Discover Bank, driving the delivery of high-performance applications in the Financial Services domain, resulting in enhanced client engagement and satisfaction.',                        
                    text02: '★ Feature Development: Designed and developed 50+ user-facing features using React.js, enhancing the customer experience and building reusable front-end libraries. features using Redux, and Vite.',                        
                    text03: '★ Performance Optimization: Collaborated with developers to implement RESTful APIs, boosting loading speed by 35%. Refactored 30+ components to use Higher-Order Components (HOC).',                        
                    text04: '★ Cross-Browser Compatibility: Tested and optimized 140+ React components for enhanced performance across multiple devices and browsers.',                        
                    text05: '★ Agile Methodologies: Participated in Agile sprints, improving team productivity and outcomes.',                        
                },
                {
                    id: 2,
                    iconbox: 'iconbox-s1 d-sm-flex align-items-center',
                    iconcolor: 'iconbox-icon color3 color1',
                    spanicon: 'icon-brand',
                    companyTitle:'Capgemini',
                    title: 'Role: Associate Consultant',
                    date:'Date: May 2021 – May 2022',
                    text01: '★ Project Excellence: Played a pivotal role in the Abu Dhabi Bank project, developing responsive and scalable UI components using React.js, TypeScript, and advanced libraries like Material-UI and Formik, contributing to successful project delivery.',                        
                    text02: '★ Quality Assurance Leadership: Implemented rigorous bug-fixing and test case writing processes, introducing innovative ideas and proofs of concept that significantly enhanced application functionality and reliability.',                        
                    text03: '★ Cross-Functional Collaboration: Fostered seamless teamwork across backend, QA, design, and product teams throughout all project phases, ensuring alignment and achieving high standards of delivery excellence.',
                    text04: '★ Code Quality Assurance: Led comprehensive code reviews and implemented best practices, ensuring superior code quality, maintainability, and adherence to project objectives.',
                },
                {
                    id: 3,
                    iconbox: 'iconbox-s1 d-sm-flex justify-content-lg-center align-items-center mgl-iconbox-s1',
                    iconcolor: 'iconbox-icon color1',
                    spanicon: 'icon-designer',
                    companyTitle:'Gammastack',
                    title: 'Role- Solution Engineer',
                    date:'Date: May 2020 - August 2020',
                    text01: '★ Application Development: Developed 3+ frontend applications for data analysis, ensuring secure interactions with multiple APIs.',
                    text02: '★ Technology Stack: Utilized modern technologies including React.js, Next.js, Material-UI, Formik, and Yup to build responsive, global UI components.',
                    text03: '★ Feature Implementation: Developed and implemented a standalone data extraction agent, enhancing the capabilities of a financial product.',
                    text04: '★ Collaboration: Worked closely with project managers, developers, and QA teams to address challenges, optimize testing methods, and apply best practices.',
                },
                {
                    id: 4,
                    iconbox: 'iconbox-s1 d-sm-flex justify-content-lg-end align-items-center mgr-iconbox-s1',
                    iconcolor: 'iconbox-icon color3',
                    spanicon: 'icon-designer',
                    companyTitle:'Nagravision India Pvt. Ltd., Bangalore',
                    title: 'Role- SOFTWARE ENGINEER',
                    date:'Date: July 2018 - July 2019',
                    text01: '★ Automated Testing: Developed comprehensive testing strategies, increasing test coverage from 15% to 85% with 350+ JavaScript test cases in Jenkins.',
                    text02: '★ Collaboration: Partnered with frontend and backend teams to align testing and development strategies with client requirements.',
                },
            ]
        }
    }
    render() {
        return (
            <div className="section slide-personal-Intro-third slide-dark bg-white">
                <section className="specilizing-in s1" id="experience">
                    <div className="container">
                        <div className="flat-title">
                            <h2 className="title-section color-d12 animate-element wow delay5 fadeInDown" data-wow-delay="0.5s">I have worked at</h2>
                        </div>
                        <div className="row position-relative z-index1">
                            {
                                this.state.design.map(data => (
                                    <Design key={data.id} data={data}/>
                                ))
                            }
                            <div className="flat-spacer" data-desktop="0" data-mobile="0" data-smobile="0"></div>
                            <div className="fact">
                                {/* <NumberCount /> */}
                                <div className="btn-contact bg-s1 text-center">
                                    <h4 className="title color-d12">I am Available! Let’s talk.</h4>
                                    <Link to="#" className="email color-s1 color-d14"> <a href="mailto:shubham14p3@gmail.com">shubham14p3@gmail.com</a></Link>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="featured-post animate-element wow delay5 fadeInRight" data-wow-delay="0.5s">
                        <img src="images/section/09.png" alt="images" />
                    </div>
                </section>
            </div>
        );
    }
}

export default Specilizing;
