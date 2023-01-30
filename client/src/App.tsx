import React from "react";
import axios from "axios";

import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import { useAppDispatch } from "./redux/hooks";
import { checkAuth } from "./redux/actions";

const NotFound = (): JSX.Element => <h1 style={{ textAlign: "center", marginTop: "80px" }}>Page Not Found</h1>;

function App(): JSX.Element {
  const dispatch: AppDispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

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
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Button onClick={logout}>Logout</Button>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
