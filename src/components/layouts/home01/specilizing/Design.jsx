import React, { Component } from 'react';
import {Link} from 'react-router-dom' 
class Design extends Component {
    render() {
        return (
            <div className="col-lg-9 animate-element wow delay5 fadeInUp" data-wow-delay="0.5s">
                <div className={this.props.data.iconbox}>
                    <div className={this.props.data.iconcolor}><span className={this.props.data.spanicon} /></div>
                    <div className="ct-is">
                        <h3 className="title mg-b21"><Link to="#">{this.props.data.companyTitle}</Link></h3>
                        <h4 className="title "><b><i>{this.props.data.title}</i></b></h4>
                        {this.props.data.date}
                        <p className="lt-sp01">
                            {this.props.data.text01}<br />{this.props.data.text02}<br />{this.props.data.text03}<br />{this.props.data.text04}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Design;
