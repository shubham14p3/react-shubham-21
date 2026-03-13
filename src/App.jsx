import React, { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import LoaderSwitcher from "./components/pages/loaders/LoaderSwitcher";
import ScrollToTopHandler from "./components/common/ScrollToTopHandler";

function App() {
  return (
    <Suspense fallback={<LoaderSwitcher />}>
      <ScrollToTopHandler />
      <AppRoutes />
    </Suspense>
  );
}

export default App;