import React, { Component } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line
import { Design, NumberCount } from "./specilizing/index";

class Specilizing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      design: [
        {
          id: 1,
          iconbox: "iconbox-s1 d-sm-flex align-items-center",
          iconcolor: "iconbox-icon color2 color1",
          spanicon: "icon-designer",
          companyTitle: "Capgemini",
          title: "Role: Consultant",
          date: "Date: June 2022 - current",
          text01:
            "★ Currently working on the Financial Services domain for Discover Bank (Capgemini Client).",
          text02:
            "★ Designed and developed over 50+ user-facing features via React JS and build front-end libraries",
          text03:
            "★ Worked alongside other developers to implement Restful APIs that enabled the internal team to increase the loading speed by 35%, Converted over 30+ components to HOC and more.",
          text04:
            "★ Tested and optimized 140+ React components for better performance across devices and browsers. ",
        },
        {
          id: 2,
          iconbox: "iconbox-s1 d-sm-flex align-items-center",
          iconcolor: "iconbox-icon color2 color1",
          spanicon: "icon-designer",
          companyTitle: "Capgemini",
          title: "Role: Associate Consultant",
          date: "Date: May 2021 - May 2022",
          text01:
            "★ Worked on the Financial Services domain for Abu Dhabi Bank (Capgemini Client).",
          text02:
            "★ Built responsive and global components UIs using a modern technology stack like ReactJS, Typescript & other third-party libraries like Material UI, Formick, Yup, etc.",
          text03:
            "★ Performed bug fixes, writing test cases, Identifying innovative ideas & proof of concepts as per need. ",
          text04:
            "★ Collaborated and work hand-in-hand with backend, QA, design and product colleagues to support the projects during all phases of delivery.",
        },

        {
          id: 3,
          iconbox:
            "iconbox-s1 d-sm-flex justify-content-lg-center align-items-center mgl-iconbox-s1",
          iconcolor: "iconbox-icon color2 color1",
          spanicon: "icon-designer",
          companyTitle: "Gammastack",
          title: "Role- Software Developer (Solution Engineer)",
          date: "Date: May 2020 - August 2020",
          text01:
            "★ Developed 3+ Front-End apps to analyze and process data for different clients.",
          text02:
            "★ Ensure applications security and ability to interact with multiple APIs.",
          text03:
            "★ Built responsive and global components UIs using a modern technology stack like React JS , Next JS & other third-party libraries like Material UI, Formick, Yup, etc.",
          text04:
            '★ Developed and implemented a standalone data extraction "agent" and main-application features for the financial product.',
          text05:
            "★ Work closely with app development team including the project and product manager, developers, and QA to determine problems, testing methods, and best practices.",
        },
        {
          id: 4,
          iconbox:
            "iconbox-s1 d-sm-flex justify-content-lg-center align-items-center mgl-iconbox-s1",
          iconcolor: "iconbox-icon color2 color1",
          spanicon: "icon-designer",
          companyTitle: "Minusoft India Pvt Ltd",
          title: "Role- Trainee (Software Engineer)",
          date: "Date: August 2019 - May 2020",
          text01:
          "★ Developed front-end applications across various platforms using latest industry-adopted technologies and frameworks with React, Redux.",
        text02:
          "★ Played a key role in the development, improvement, and operation of web-based software.",
        text03:
          "★ Gained hands-on expertise in Bootstrap, Foundation as well as front-end presentation frameworks web application frameworks.",
        text04:
          "★ Conducted unit and load testing for high profile customer, which reduced system failure rate by 70%.", },
        {
          id: 5,
          iconbox:
            "iconbox-s1 d-sm-flex justify-content-lg-end align-items-center mgr-iconbox-s1",
          iconcolor: "iconbox-icon color3",
          spanicon: "icon-brand",
          companyTitle: "Nagravision India Pvt Ltd",
          title: "Role- Trainee (Tester)",
          date: "Date: July 2018 - July 2019",
          text01:
            "★ Testing front-end Application and writing JavaScript Test case for Automated testing in Jenkins.",
          text02:
            "★ Increased the coverage of Test case from 15% to 85% , with adding over 350+ Test cases.",
          text03:
            "★ Worked parallelly with front-end Developers and backend developers to know the client requirements and comping up with appropriate test strategies.",
          text04:
            "★ Demonstrated Testing plans, Demos. Documented all type of testing functionality and other depending on the need.",
        },
      ],
    };
  }
  render() {
    return (
      <div className="section slide-personal-Intro-third slide-dark bg-white">
        <section className="specilizing-in s1" id="experience">
          <div className="container">
            <div className="flat-title">
              <h2
                className="title-section color-d12 animate-element wow delay5 fadeInDown"
                data-wow-delay="0.5s"
              >
                I have worked at
              </h2>
            </div>
            <div className="row position-relative z-index1">
              {this.state.design.map((data) => (
                <Design key={data.id} data={data} />
              ))}
              <div
                className="flat-spacer"
                data-desktop="0"
                data-mobile="0"
                data-smobile="0"
              ></div>
              <div className="fact">
                {/* <NumberCount /> */}
                <div className="btn-contact bg-s1 text-center">
                  <h4 className="title color-d12">
                    I am Available! Let’s talk.
                  </h4>
                  <Link to="#" className="email color-s1 color-d14">
                    {" "}
                    <a href="mailto:shubham14p3@gmail.com">
                      shubham14p3@gmail.com
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="featured-post animate-element wow delay5 fadeInRight"
            data-wow-delay="0.5s"
          >
            <img src="images/section/09.png" alt="images" />
          </div>
        </section>
      </div>
    );
  }
}

export default Specilizing;
