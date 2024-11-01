import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy load components
const Home = lazy(() => import("./components/pages/Home"));
const Blog = lazy(() => import("./components/pages/Blog"));
const BlogSingle = lazy(() => import("./components/pages/BlogSingle"));

// Loader component with unique, fun styling
function Loader() {
  const loaderContainerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#333",
  };

  const emojiStyle = {
    display: "block",
    fontSize: "3rem",
    animation: "spin 1.5s linear infinite",
  };

  const messageStyle = {
    marginTop: "10px",
    fontSize: "1.2rem",
    color: "#555",
  };

  return (
    <div style={loaderContainerStyle}>
      <span role="img" aria-label="loading" style={emojiStyle}>
        😎
      </span>
      <br/>
      <br/>
      <div style={messageStyle}>Hang tight, awesome content is on its way!</div>

      {/* Inline CSS animation for the spinning emoji */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-single" element={<BlogSingle />} />
      </Routes>
    </Suspense>
  );
}

export default App;
