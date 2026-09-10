import React, { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTopHandler from "./components/common/ScrollToTopHandler";

function App() {
  return (
    <Suspense fallback={<p className="route-loading" role="status">Opening page…</p>}>
      <ScrollToTopHandler />
      <AppRoutes />
    </Suspense>
  );
}

export default App;
