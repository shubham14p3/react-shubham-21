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
                    title: 'Role: Associate Consultant',
                    date:'Date: May 2021 - current',
                    text01: '★ Worked on Financial Services domain for Abu Dhabi Bank.',                        
                    text02: '★ Built responsive and global component UIs using a modern technology stack like Reactjs, NextJS, Typescript & other third-party libraries',                        
                    text03: '★ Performed bug fixes, writing test cases, Identifying innovative ideas and proof of concepts according to project requirements',                        
                    text04: '★ Collaborated and work hand-in-hand with backend, QA, design and product colleagues to support projects during all phases of delivery',                        
                },
                {
                    id: 2,
                    iconbox: 'iconbox-s1 d-sm-flex justify-content-lg-center align-items-center mgl-iconbox-s1',
                    iconcolor: 'iconbox-icon color2 color1',
                    spanicon: 'icon-designer',
                    companyTitle:'Gammastack',
                    title: 'Role- Solution Engineer',
                    date:'Date: May 2020 - August 2020',
                    text01: '★ Developed code to convert design wire-frames into website elements under supervision.',
                    text02: '★ Collaborated with product team members to implement new feature developments.',
                    text03: '★ Worked in debugging codes to improve website performance and user experience.',
                    text04: '★ Worked within an agile team and helped prioritize and scope feature requests.' 
                },
                {
                    id: 3,
                    iconbox: 'iconbox-s1 d-sm-flex justify-content-lg-end align-items-center mgr-iconbox-s1',
                    iconcolor: 'iconbox-icon color3',
                    spanicon: 'icon-brand',
                    companyTitle:'Nagravision India Pvt Ltd',
                    title: 'Role- Trainee',
                    date:'Date: July 2018 - July 2019',
                    text01: '★ Developed test cases and scripts using Javascript.',
                    text02: '★ Developed a Defects Tracking Log for the SharePoint Site to track defects while testing.',
                    text03: '★ Gained hands-on expertise in Bootstrap, Javascript and as well as front-end technologies like React',
                    text04: '★ Used Quality Center to store all testing results, metrics, created Test Cases, and Reporting.'                  
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
