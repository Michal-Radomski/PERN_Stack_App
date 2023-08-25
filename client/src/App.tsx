import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
//Todo: use it?
import { shallowEqual } from "react-redux";

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

  const [
    authStatus,
    authMessageFromRedux,
    colorAuthStatus,
    userMessageFromRedux,
    userColorFromRedux,
    allTodosMessageFromRedux,
    allTodosColorFromRedux,
  ]: [boolean, string, string, string, string, string, string] = useAppSelector(
    (state: RootState) => [
      state?.auth?.authStatus?.auth,
      state?.auth?.authStatus?.message,
      state?.auth?.authStatus?.color,
      state?.todos?.userTodos?.message,
      state?.todos?.userTodos?.color,
      state?.todos?.allTodos?.message,
      state?.todos?.allTodos?.color,
    ],
    shallowEqual
  );
  // console.log("authMessage;", authMessage);

  const [authMessage, setAuthMessage] = React.useState<string>("");
  const [authColor, setAuthColor] = React.useState<string>("");
  const [userMessage, setUserMessage] = React.useState<string>("");
  const [userColor, setUserColor] = React.useState<string>("");
  const [allTodosMessage, setAllTodosMessage] = React.useState<string>("");
  const [allTodosColor, setAllTodosColor] = React.useState<string>("");
  // console.log({ authMessage });

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  React.useEffect(() => {
    setAuthMessage(authMessageFromRedux);
  }, [authMessageFromRedux, authMessage]);

  React.useEffect(() => {
    if (colorAuthStatus) {
      setAuthColor(colorAuthStatus);
    }
  }, [colorAuthStatus, authMessage]);

  React.useEffect(() => {
    if (userMessageFromRedux) {
      setUserMessage(userMessageFromRedux);
    }
  }, [userMessageFromRedux]);

  React.useEffect(() => {
    if (userColorFromRedux) {
      setUserColor(userColorFromRedux);
    }
  }, [userColorFromRedux]);

  React.useEffect(() => {
    if (allTodosMessageFromRedux) {
      setAllTodosMessage(allTodosMessageFromRedux);
    }
  }, [allTodosMessageFromRedux]);

  React.useEffect(() => {
    if (allTodosColorFromRedux) {
      setAllTodosColor(allTodosColorFromRedux);
    }
  }, [allTodosColorFromRedux]);

  return (
    <React.Fragment>
      <Router>
        <Header />
        {authMessage && <ToastComponent message={authMessage} color={authColor ? authColor : "info"} distance="100px" />}
        {userMessage && <ToastComponent message={userMessage} color={userColor ? userColor : "info"} distance="225px" />}
        {allTodosMessage && (
          <ToastComponent message={allTodosMessage} color={allTodosColor ? allTodosColor : "info"} distance="225px" />
        )}
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
