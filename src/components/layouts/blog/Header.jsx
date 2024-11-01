import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import links from '../links';
import menus from '../menus';
import bloglinks from '../bloglinks';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };
    }

    toggleMenu = () => {
        this.setState(prevState => ({ showMenu: !prevState.showMenu }));
    };

    render() {
        const { showMenu } = this.state;

        return (
            <header id="header" className="header header-style1">
                <div className="container">
                    <div className="flex-header d-flex justify-content-between align-items-center">
                        <div className="socials-list-hd s1 hv1">
                            <Link to="#"><i className="fa fa-facebook" aria-hidden="true" /></Link>
                            <Link to="#"><i className="fa fa-twitter" aria-hidden="true" /></Link>
                            <Link to="#"><i className="fa fa-instagram" aria-hidden="true" /></Link>
                        </div>

                        {/* Toggle 'show' or 'hide' class based on showMenu state */}
                        <div className={`content-menu d-lg-flex ${showMenu ? 'show' : 'hide'}`}>
                            <div className="nav-wrap">
                                <nav id="mainnav" className="mainnav">
                                    <ul className="menu ace-responsive-menu" data-menu-style="horizontal">
                                        <li><Link to="/">Home</Link>
                                            <ul className="sub-menu">
                                                {
                                                    links.map(data => (
                                                        <li key={data.id}>
                                                            <Link to={data.tolink} onClick={() => { window.location.href = data.tolink }}>
                                                                {data.namelink}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                        {
                                            menus.map(menu => (
                                                <li key={menu.id}><Link to={menu.tomenu} className="click-model">{menu.namemenu}</Link></li>
                                            ))
                                        }
                                        <li><Link to="#" className="active">Blog</Link>
                                            <ul className="sub-menu">
                                                {
                                                    bloglinks.map(data => (
                                                        <li key={data.id}>
                                                            <Link to={data.toblog} onClick={() => { window.location.href = data.toblog }}>
                                                                {data.nameblog}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="hire-me-s1 btn-general btn-hv-common d-lg-flex align-items-center">
                                <Link to="#" className="btn-inner border-corner2 lt-sp08 text-white">Hire Me</Link>
                            </div>
                        </div>

                        {/* Hamburger toggle button */}
                        <div className="btn-menu mobile-header__menu-button" onClick={this.toggleMenu}>
                            <div className="line line-1" />
                            <div className="line line-2" />
                            <div className="line line-3" />
                        </div>
                    </div>
                </div>

                {/* Inline CSS or external styles can be used here */}
                <style>
                    {`
                        /* Hide menu by default on small screens */
                        .content-menu.hide {
                            display: none;
                        }
                        
                        /* Show menu when toggle is active */
                        .content-menu.show {
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                        }

                        /* Responsive adjustments */
                        @media (max-width: 768px) {
                            .content-menu {
                                position: absolute;
                                top: 70px;
                                left: 0;
                                width: 100%;
                                background-color: white;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                z-index: 1000;
                            }
                            .nav-wrap ul {
                                flex-direction: column;
                                padding: 10px;
                            }
                            .menu li {
                                margin: 5px 0;
                            }
                            .hire-me-s1 {
                                display: flex;
                                justify-content: center;
                                width: 100%;
                            }
                        }

                        .btn-menu {
                            display: none;
                        }

                        /* Show toggle button on mobile */
                        @media (max-width: 768px) {
                            .btn-menu {
                                display: block;
                                cursor: pointer;
                            }
                            .btn-menu .line {
                                width: 25px;
                                height: 2px;
                                background: black;
                                margin: 4px 0;
                            }
                        }
                    `}
                </style>
            </header>
        );
    }
}

export default Header;
