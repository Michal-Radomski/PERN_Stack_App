import axios from "axios";

const customAxiosInstance = axios.create({
  baseURL: `/api`,
  timeout: 2000,
});

// const requestHandler = (request: any) => {
//   console.log(request);
//   return request;
// };

// const responseHandler = (response: any) => {
//   if (response.status === 401) {
//     console.log(401);
//   }

//   return response;
// };

// const errorHandler = (error: any) => {
//   return Promise.reject(error);
// };

// customInstance.interceptors.request.use(
//   (request) => requestHandler(request),
//   (error) => errorHandler(error)
// );

// customInstance.interceptors.response.use(
//   (response) => responseHandler(response),
//   (error) => errorHandler(error)
// );

// Add a request interceptor
customAxiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log({ config });
    return config;
  },
  function (error) {
    // Do something with request error
    console.log({ error });
    return Promise.reject(error);
  }
);

// Add a response interceptor
customAxiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (response.status === 401 || response.status === 403) {
      // window.location = '/login';
      console.log(response.status);
    }

    console.log({ response });
    return response;
  },
  function (error) {
    console.log({ error });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default customAxiosInstance;

// // Add a request interceptor
// axios.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     console.log({ config });
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     console.log({ error });
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     console.log({ response });
//     return response;
//   },
//   function (error) {
//     console.log({ error });
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
