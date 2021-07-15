import React, { Component } from 'react';

class Testimonial extends Component {
    constructor(props){
        super(props);
        this.state = {
            testimonial: [
                {
                    id: 1,
                    img: './images/testimonial/001.jpg',
                    alt: 'images',
                    text01: 'It was a pleasure to work together with Shubham on many college projects,  ',
                    text02: 'who is an outstanding Full Stack Developer at GAMMASTACK. Thanks to interpersonal ',
                    text03: 'skills he has great relations with team members. He is always capable ',
                    text04: 'of adapting to new working environments. Shubham worked far beyond the call of duty. ',
                    text05: 'He is a reliable person and I will always hold him in the highest esteem.',
                    name: 'Kajal Rajwade',
                    company: '- Solution Engineer at ex-Gammastack',
                    classname: 'testimonial-t1 text-center'
                },

                

                {
                    id: 2,
                    img: './images/testimonial/002.jpg',
                    alt: 'images',
                    text01: 'Shubham has been a good teammate at microverse, he doesnot hesitate to help ',
                    text02: 'people when having doubts or questions. Aside from that, he is also a good software developer. ',
                    text03: 'He has completed every single project as fast and well done as possible.',
                    name: 'Luis Octavio Ramirez Cruz',
                    company: '- Full-stack Developer : Microverse ',
                    classname: 'testimonial-t1 text-center'
                },
                {
                    id: 3,
                    img: './images/testimonial/003.jpg',
                    alt: 'images',
                    text01: 'So far a few people have had the opportunity of working with a helpful ',
                    text02: 'and efficient team mate - but I had the chance when I partnered with ',
                    text03: 'Shubham on a few projects. He is always on top of everything and works quicker ',
                    text04: 'than anybody I have come across. He improves any team he joins ',
                    text05: 'and it would be great working with him again.',
                    name: 'Nakitto Catherine',
                    company: '- Full-stack Developer : Microverse',
                    classname: 'testimonial-t1 text-center'
                },
                {
                    id: 4,
                    img: './images/testimonial/004.jpg',
                    alt: 'images',
                    text01: 'We got to know with Raj when he joined Microverse, I was assigned to be his mentor ',
                    text02: 'but we didnot progress because he switched to another timezone. I remember one day ',
                    text03: 'he reached out to me, he needed help, I asked him to give me some minutes.',
                    text04: ' When I was available he had just solved the problem, I was so impressed with his solution, ',
                    text05: 'he is a talented guy and when he is stuck he is ready to ask for help.',
                    name: 'Theophile Kango',
                    company: '- Full-stack Developer : Microverse',
                    classname: 'testimonial-t1 text-center'
                }
            ]
        }
    }
    render() {
        return (
            <div className="container">
                <div className="custom-dot dot-t1 dot-s1 none-nav-default mg-dots-s1">
                    <div className="flat-carousel-box data-effect clearfix" data-gap={0} data-column={1} data-column2={1} data-column3={1} data-column4={1} data-column5={1} data-dots="true" data-auto="false" data-nav="false" data-loop="true">
                        <div className="owl-carousel">
                            {
                                this.state.testimonial.map(data => (
                                    
                                    <div className={data.classname} key={data.id}>
                                                    <div className="avatar mg-b29"><img src={data.img} alt={data.alt} /></div>
                                                    <p className="lt-sp03 mg-b25">
                                                        {data.text01}<br /> {data.text02} <br/>{data.text03}<br/>{data.text04}<br/>{data.text05}
                                                    </p>
                                        <h3 className="name f-w600">{data.name}</h3><h4 className="name f-w600">{data.company}</h4>
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

export default Testimonial;
