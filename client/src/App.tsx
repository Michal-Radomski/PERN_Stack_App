import React from "react";

import "./App.scss";
import Login from "./components/Login";

function App(): JSX.Element {
  return (
    <React.Fragment>
      PERN Stack Auth App
      <Login />
    </React.Fragment>
  );
}

export default App;
