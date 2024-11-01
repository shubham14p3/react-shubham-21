import React, { Component } from 'react';
import resumeOne from '../../../../assets/resume/resume.pdf';
class EducationRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: [
                {
                    id: 1,
                    timeline: 'timeline-inverted color1',
                    info: 'Indian Institute of Technology (IIT), Jodhpur(IITJ)',
                    title: 'M Tech',
                    text: 'Masters in Engineering with Data Engineering from Indian Institute of Technology (IIT), Jodhpur (IITJ), started in 2024 and currently in progress.'
                },
                {
                    id: 2,
                    timeline: 'timeline-inverted color1',
                    info: 'C.S.V.T.U',
                    title: 'Bachelors Degree',
                    text: 'Bachelor in Engineering with Computer Science Engineering from Bhilai Institute of Technology in year 2014-2018.'
                },
                {
                    id: 3,
                    timeline: 'timeline-inverted color2',
                    info: 'C.B.S.E.',
                    title: 'Intermediate',
                    text: 'Intermediate from Vidya Bharati Chinmaya Vidyalaya under C.B.S.E. in year 2014.'
                },
                {
                    id: 4,
                    timeline: 'timeline-inverted color3',
                    info: 'C.B.S.E.',
                    title: 'Matriculation',
                    text: 'Matriculation from Vidya Bharati Chinmaya Vidyalaya under C.B.S.E. in year 2011.'
                }
            ]
        }
    }
    render() {
        return (
            <div className="col-right">
                <div className="flat-spacer" data-desktop={0} data-mobile={70} data-smobile={70} />
                <div className="flat-title t1 animate-element wow delay5 fadeInDown">
                    <h4 className="sub-title mg-b13">Educational qualification</h4>
                    <h2 className="title-section color-d12">My Education</h2>
                </div>
                <div className="timelines position-relative animate-element wow delay5 fadeInUp" data-wow-delay="0.5s">
                    <ul className="timeline">
                        {
                            this.state.skill.map(data => (
                                <li className={data.timeline} key={data.id}>
                                    <div className="timeline-badge" />
                                    <div className="timeline-panel">
                                        <h3 className="f-info">{data.info}</h3>
                                        <div className="s-info">{data.title}</div>
                                        <p>
                                            {data.text}
                                        </p>
                                    </div>
                                </li>
                            ))
                        }

                    </ul>
                    <div className="fl-btn btn-general btn-hv-border">

                        <a
                            href={resumeOne}
                            className="f-w500 lt-sp1 border-corner2 text-one"
                        >Download Resume</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default EducationRight;
