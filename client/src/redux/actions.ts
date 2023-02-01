import axios from "axios";

import { CHECK_AUTH, LOGIN, LOGOUT } from "./actionTypes";

export const checkAuth = () => async (dispatch: AppDispatch) => {
  const URL = "/api/verify";
  await axios
    .post(URL)
    .then((response) => {
      const dataToPass = response?.data;
      // console.log("response.status:", response.status);
      // console.log("dataToPass:", dataToPass);
      if (response.status === 200) {
        const dataToPassWithStatus = { ...dataToPass, auth: true };
        // console.log("dataToPassWithStatus:", dataToPassWithStatus);
        dispatch({ type: CHECK_AUTH, payload: dataToPassWithStatus });
      }
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status !== 200) {
          const dataToPass = error.response.data;
          const dataToPassWithStatus = { ...dataToPass, auth: false };
          dispatch({ type: CHECK_AUTH, payload: dataToPassWithStatus });
        }
        // console.log("error.response.data:", error.response.data);
        // console.log("error.response.status:", error.response.status);
        // console.log("error.response.headers:", error.response.status);
      } else if (error.request) {
        // console.log("error.request:", error.request);
      } else {
        // console.log("Error - error.message", error.message);
      }
      // console.log("error.config:", error.config);
    });
};

export const logoutAction = () => async (dispatch: AppDispatch) => {
  const URL = "/api/logout";
  await axios
    .post(URL)
    .then((response) => {
      const dataToPass = response?.data;
      // console.log("dataToPass:", dataToPass);
      const dataToPassWithStatus = { ...dataToPass, auth: false };
      // console.log("dataToPassWithStatus:", dataToPassWithStatus);
      dispatch({ type: LOGOUT, payload: dataToPassWithStatus });
    })
    .catch(function (error) {
      console.log({ error });
      if (error.response) {
        if (error.response.status !== 200) {
          const dataToPass = error.response.data;
          const dataToPassWithStatus = { ...dataToPass, auth: false };
          dispatch({ type: LOGOUT, payload: dataToPassWithStatus });
        }
      }
    });
};

export const loginAction = (user: User) => async (dispatch: AppDispatch) => {
  const URL = "/api/login";
  await axios
    .post(URL)
    .then((response) => {
      const dataToPass = response?.data;
      // console.log("response.status:", response.status);
      // console.log("dataToPass:", dataToPass);
      if (response.status === 200) {
        const dataToPassWithStatus = { ...dataToPass, auth: true };
        // console.log("dataToPassWithStatus:", dataToPassWithStatus)
        dispatch({ type: LOGIN, payload: dataToPassWithStatus });
      }
    })
    .catch(function (error) {
      if (error) {
        const dataToPass = error.response.data;
        const dataToPassWithStatus = { ...dataToPass, auth: false };
        dispatch({ type: CHECK_AUTH, payload: dataToPassWithStatus });
      }
    });
};
