import React from "react";
import MainRouter from "./mainRouter/MainRouter";
import ErrorBoundary from "./components/error/ErrorBoundary";

const App = () => {
  return (
    // <></>
    <ErrorBoundary>
      <MainRouter />
    </ErrorBoundary>
  );
};

export default App;
