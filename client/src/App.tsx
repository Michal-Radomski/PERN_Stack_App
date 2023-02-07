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
import ToastComponent from "./components/ToastComponent";
import LandingPage from "./components/LandingPage";
import DashboardAllTodo from "./components/DashboardAllTodos";

function App(): JSX.Element {
  const dispatch: AppDispatch = useAppDispatch();

  const [authStatus, authMessage, colorStatus]: [boolean, string, string] = useAppSelector((state: RootState) => [
    state?.auth?.authStatus?.auth,
    state?.auth?.authStatus?.message,
    state?.auth?.authStatus?.color,
  ]);
  // console.log("authMessage;", authMessage);

  const [message, setMessage] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");
  // console.log({ message });

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  React.useEffect(() => {
    setMessage(authMessage);
  }, [authMessage, message]);

  React.useEffect(() => {
    if (colorStatus) {
      setColor(colorStatus);
    }
  }, [colorStatus, message]);

  return (
    <React.Fragment>
      <Router>
        <Header />
        {message && <ToastComponent message={message} color={color ? color : "info"} />}
        <Routes>
          <Route path="/" element={authStatus ? <Navigate replace={true} to="/dashboard" /> : <LandingPage />} />
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
          <Route
            path="/dashboard/all-todos"
            element={
              <PrivateRoute>
                <DashboardAllTodo />
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
