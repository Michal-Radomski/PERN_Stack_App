import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { checkAuth } from "./redux/actions";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import NotFound from "./components/NotFound";

function App(): JSX.Element {
  const dispatch: AppDispatch = useAppDispatch();

  const [authStatus]: [object] = useAppSelector((state: RootState) => [state?.appState?.authStatus]);
  console.log("authStatus;", authStatus);

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
