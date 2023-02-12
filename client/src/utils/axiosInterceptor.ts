import axios from "axios";

import store from "../redux/store";
import { CHECK_AUTH, REFRESH_TOKEN } from "../redux/actionTypes";

const customAxiosInstance = axios.create({
  baseURL: `/api`,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

//* Request interceptor
customAxiosInstance.interceptors.request.use(
  function (config) {
    //* Do something before request is sent
    // console.log({ config });
    return config;
  },
  function (error) {
    //* Do something with request error
    // console.log({ error });
    return Promise.reject(error);
  }
);

//* Response interceptor
customAxiosInstance.interceptors.response.use(
  function (response) {
    //* Any status code that lie within the range of 2xx cause this function to trigger
    //* Do something with response data
    //  console.log({ response });
    return response;
  },
  async function (error) {
    //* Any status codes that falls outside the range of 2xx cause this function to trigger
    //* Do something with response error
    // console.log({ error });
    const originalConfig = error.config;
    if ((error.response.status === 401 || error.response.status === 403) && !originalConfig._retry) {
      originalConfig._retry = true;
      // console.log("error.response.status:", error.response.status);
      const URLtoRefresh = "/api/refresh";
      await axios
        .post(URLtoRefresh)
        .then((response) => {
          const dataToPass = response?.data;
          // console.log("response.status:", response.status);
          // console.log("dataToPass:", dataToPass);
          if (response.status === 200) {
            const dataToPassWithStatus = { ...dataToPass, auth: true };
            // console.log("dataToPassWithStatus:", dataToPassWithStatus);
            store.dispatch({ type: REFRESH_TOKEN, payload: dataToPassWithStatus });
          }
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status !== 200) {
              const dataToPass = error.response.data;
              const dataToPassWithStatus = { ...dataToPass, auth: false };
              store.dispatch({ type: CHECK_AUTH, payload: dataToPassWithStatus });
            }
          }
        });
    }
    return Promise.reject(error);
  }
);

export default customAxiosInstance;
