import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
// import Home from "./components/pages/Home";
import Blog from "./components/pages/Blog";
import BlogSingle from "./components/pages/BlogSingle";
function App() {
  return (
    <>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL + "/"}`} element={<Home />} />
        <Route
          path={`${process.env.PUBLIC_URL + "/blog"}`}
          element={<Blog />}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/blog-single"}`}
          element={<BlogSingle />}
        />
      </Routes>
    </>
  );
}

export default App;
