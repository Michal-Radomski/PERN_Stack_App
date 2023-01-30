import axios from "axios";

import { CHECK_AUTH } from "./actionTypes";

export const checkAuth = () => async (dispatch: AppDispatch) => {
  axios
    .post("/api/verify")
    .then((response) => {
      const dataToPass = response?.data;
      // console.log("response.status:", response.status);
      // console.log("dataToPass:", dataToPass);
      if (response.status === 200) {
        dispatch({ type: CHECK_AUTH, payload: dataToPass });
      }
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status !== 200) {
          const dataToPass = error.response.data;
          dispatch({ type: CHECK_AUTH, payload: dataToPass });
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
