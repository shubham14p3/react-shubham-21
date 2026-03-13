import React from 'react';
import { Link } from 'react-router-dom';

const Design = ({ data }) => {
    // Function to format text between ★ and :
    const formatText = (text) => {
        if (!text) {
            return null;
        }

        const regex = /★(.*?):/g;
        const parts = text.split(regex);

        if (!parts || parts.length < 2) {
            return text; // Return original text if no match found or parts are insufficient
        }

        return parts.map((part, index) => {
            if (index % 2 === 1) {
                // Bold the text between ★ and :
                return <b key={index}>{part}</b>;
            } else {
                // Return non-bolded text
                return part;
            }
        });
    };

    return (
        <div className="col-lg-6 col-md-6 col-sm-12 mb-4 animate-element wow delay5 fadeInUp" data-wow-delay="0.5s">
            <div className="card h-100">
                <div className={`card-body ${data.iconbox}`}>
                    <div className={data.iconcolor}><span className={data.spanicon} /></div>
                    <div className="ct-is">
                        <h3 className="card-title title mg-b21"><Link to="#">{data.companyTitle}</Link></h3>
                        <h5 className="card-subtitle title mb-2"><b><i>{data.title}</i></b></h5>
                        <p className="card-text lt-sp01" style={{ textAlign: 'justify' }}>
                            {formatText(data.date)}<br />
                            {formatText(data.text01)}<br />
                            {formatText(data.text02)}<br />
                            {formatText(data.text03)}<br />
                            {formatText(data.text04)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Design;
