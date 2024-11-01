import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banner, ContentSingle, Sidebar, Header } from '../layouts/marriage/index';
import { Footer } from '../layouts/home01/index';

const Marriage = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already verified from localStorage
        const storedVerification = localStorage.getItem('isVerified');
        if (storedVerification === 'true') {
            setIsVerified(true);
            setTimeout(() => {
                localStorage.removeItem('isVerified');
                setIsVerified(false);
            }, 300000); // Clear verification after 5 minutes
        }
    }, []);

    const verifyPassword = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (passwordInput === 'shubhamm') {
                setIsVerified(true);
                localStorage.setItem('isVerified', 'true'); // Save verification status
                setIsLoading(false);
            } else {
                setIsLoading(false);
                navigate('/'); // Redirect to home if password is incorrect
            }
        }, 1000); // Simulate loading delay
    };

    if (!isVerified) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                {isLoading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div style={{ fontSize: "1.2rem", color: "#555", marginTop: "10px" }}>
                            Verifying, please wait...
                        </div>
                    </div>
                ) : (
                    <div className="card p-4 shadow-sm" style={{ width: "300px", textAlign: "center" }}>
                        <h5 className="mb-3">Enter Password</h5>
                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                        <button
                            onClick={verifyPassword}
                            className="btn btn-primary w-100"
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="counter-scroll">
            <div id="mobile-menu-overlay"><span className="tf-close"></span></div>
            <Header />
            <Banner />
            <div className="blog-single col-blog">
                <div className="container d-lg-flex">
                    <ContentSingle />
                    {/* Uncomment if Sidebar needed */}
                    {/* <Sidebar /> */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Marriage;
