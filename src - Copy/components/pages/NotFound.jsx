import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to home after 2 seconds
        const timer = setTimeout(() => navigate("/"), 2000);
        return () => clearTimeout(timer); // Clear timer on component unmount
    }, [navigate]);

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        color: "#333",
    };

    const messageStyle = {
        fontSize: "1.5rem",
        marginBottom: "10px",
    };

    const linkStyle = {
        fontSize: "1.2rem",
        color: "#007bff",
        textDecoration: "none",
        marginTop: "20px",
    };

    return (
        <div style={containerStyle}>
            <div style={messageStyle}>404 - Page Not Found</div>
            <div style={messageStyle}>Redirecting to the Home Page in 2 seconds...</div>
            <Link to="/" style={linkStyle}>Go to Home Page</Link>
        </div>
    );
}

export default NotFound;
