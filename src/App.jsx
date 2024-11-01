import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Blog from "./components/pages/Blog";
import BlogSingle from "./components/pages/BlogSingle";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-single" element={<BlogSingle />} />

      </Routes>
    </>
  );
}

export default App;
