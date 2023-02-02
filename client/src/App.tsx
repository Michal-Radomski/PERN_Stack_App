import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { checkAuth } from "./redux/actions";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";

function App(): JSX.Element {
  const dispatch: AppDispatch = useAppDispatch();

  const [authStatus]: [boolean] = useAppSelector((state: RootState) => [state?.appState?.authStatus?.auth]);
  // console.log("authStatus;", authStatus);

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={authStatus ? <Navigate replace={true} to="/dashboard" /> : <Navigate replace={true} to="/login" />}
          />
          <Route path="/login" element={authStatus ? <Navigate replace={true} to="/dashboard" /> : <Login />} />
          <Route path="/register" element={authStatus ? <Navigate replace={true} to="/dashboard" /> : <Register />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
