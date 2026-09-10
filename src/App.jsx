import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ExperienceProvider } from "./atlas/hooks/ExperienceContext";
import Shell from "./atlas/components/Shell";
import Seo from "./atlas/seo/Seo";
import RouteBoundary from "./atlas/components/RouteBoundary";
import Home from "./atlas/pages/Home";
const Work = lazy(() => import("./atlas/pages/Work"));
const CaseStudy = lazy(() => import("./atlas/pages/CaseStudy"));
const Lab = lazy(() => import("./atlas/pages/Lab"));
const About = lazy(() => import("./atlas/pages/About"));
const Stack = lazy(() => import("./atlas/pages/Stack"));
const Recommendations = lazy(() => import("./atlas/pages/Recommendations"));
const Resume = lazy(() => import("./atlas/pages/Resume"));
const Contact = lazy(() => import("./atlas/pages/Contact"));
const NotFound = lazy(() => import("./atlas/pages/NotFound"));
export default function App() {
  const location = useLocation();
  return (
    <ExperienceProvider>
      <Seo />
      <Shell>
        <RouteBoundary key={location.pathname} path={location.pathname}>
          <Suspense
            fallback={
              <p className="route-loading" role="status">
                Opening this part of the atlas…
              </p>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/about" element={<About />} />
              <Route path="/stack" element={<Stack />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </RouteBoundary>
      </Shell>
    </ExperienceProvider>
  );
}
