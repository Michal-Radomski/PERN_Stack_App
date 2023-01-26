import axios from "axios";
import React from "react";
import { Button } from "reactstrap";

import "./App.scss";
import Login from "./components/Login";

function App(): JSX.Element {
  const logout = async () => {
    const URL = "/api/logout";
    try {
      const response = await axios.post(URL);
      // console.log(response);
      const data = response.data;
      console.log("data:", data);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <React.Fragment>
      PERN Stack Auth App
      <Login />
      <Button onClick={logout}>Logout</Button>
    </React.Fragment>
  );
}

export default App;
