import axios from "axios";

import customAxiosInstance from "../utils/axiosInterceptor";

import {
  CHECK_AUTH,
  LOGIN,
  LOGOUT,
  REGISTER,
  CHANGE_MESSAGE,
  GET_ALL_TODOS,
  GET_USER_TODOS,
  REFRESH_TOKEN,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  DELETE_USER,
} from "./actionTypes";

//* Auth
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
        // } else if (error.request) {
        // console.log("error.request:", error.request);
        // } else {
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
    .post(URL, user)
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
        dispatch({ type: LOGIN, payload: dataToPassWithStatus });
      }
    });
};

export const registerAction = (user: User) => async (dispatch: AppDispatch) => {
  const URL = "/api/register";
  await axios
    .post(URL, user)
    .then((response) => {
      const dataToPass = response?.data;
      // console.log("response.status:", response.status);
      // console.log("dataToPass:", dataToPass);
      if (response.status === 201) {
        dispatch({ type: REGISTER, payload: dataToPass });
      }
    })
    .catch(function (error) {
      if (error) {
        const dataToPass = error.response.data;
        dispatch({ type: REGISTER, payload: dataToPass });
      }
    });
};

export const changeMessage = (str: string, color?: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: CHANGE_MESSAGE, payload: { message: str, color: color } });
  } catch (error) {
    console.log(error);
  }
};

export const refreshTokenAction = () => async (dispatch: AppDispatch) => {
  const URL = "/api/refresh";
  await axios
    .post(URL)
    .then((response) => {
      const dataToPass = response?.data;
      // console.log("response.status:", response.status);
      // console.log("dataToPass:", dataToPass);
      if (response.status === 200) {
        const dataToPassWithStatus = { ...dataToPass, auth: true };
        // console.log("dataToPassWithStatus:", dataToPassWithStatus);
        dispatch({ type: REFRESH_TOKEN, payload: dataToPassWithStatus });
      }
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status !== 200) {
          const dataToPass = error.response.data;
          const dataToPassWithStatus = { ...dataToPass, auth: false };
          dispatch({ type: CHECK_AUTH, payload: dataToPassWithStatus });
        }
      } else if (error.request) {
        console.log("error.request:", error.request);
      } else {
        console.log("Error - error.message", error.message);
      }
      console.log("error.config:", error.config);
    });
};

export const deleteUser = () => async (dispatch: AppDispatch) => {
  const URL = "/api/delete/user";
  await axios
    .delete(URL)
    .then((response) => {
      const dataToPass = response?.data;
      // console.log("response.status:", response.status);
      // console.log("dataToPass:", dataToPass);
      if (response.status === 200) {
        //* auth: false - in next action: logout
        // const dataToPassWithStatus = { ...dataToPass, auth: false };
        const dataToPassWithStatus = { ...dataToPass };
        // console.log("dataToPassWithStatus:", dataToPassWithStatus);
        dispatch({ type: DELETE_USER, payload: dataToPassWithStatus });
      }
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status !== 200) {
          const dataToPass = error.response.data;
          const dataToPassWithStatus = { ...dataToPass, auth: false };
          dispatch({ type: CHECK_AUTH, payload: dataToPassWithStatus });
        }
      } else if (error.request) {
        console.log("error.request:", error.request);
      } else {
        console.log("Error - error.message", error.message);
      }
      console.log("error.config:", error.config);
    });
};

//* Get Todos
export const getAllTodos = () => async (dispatch: AppDispatch) => {
  const URL = "/dashboard/all-todos";
  await customAxiosInstance
    .get(URL)
    .then((response) => {
      const dataToPass = response?.data;
      // console.log("response.status:", response.status);
      // console.log("dataToPass:", dataToPass);
      if (response.status === 200) {
        dispatch({ type: GET_ALL_TODOS, payload: dataToPass });
      }
    })
    .catch(function (error) {
      if (error?.response) {
        console.error("error?.response?.status:", error?.response?.status);
      }
    });
};

export const getUserTodos = () => async (dispatch: AppDispatch) => {
  const URL = "/dashboard/user-list";
  await customAxiosInstance
    .get(URL)
    .then((response) => {
      const dataToPass = response?.data;
      // console.log("response.status:", response.status);
      // console.log("dataToPass:", dataToPass);
      if (response.status === 200) {
        dispatch({ type: GET_USER_TODOS, payload: dataToPass });
      }
    })
    .catch(function (error) {
      if (error?.response) {
        console.error("error?.response?.status:", error?.response?.status);
      }
    });
};

export const addTodo = (body: { description: string; privateTodo: boolean }) => async (dispatch: AppDispatch) => {
  const URL = "/todos";
  await customAxiosInstance
    .post(URL, body)
    .then((response) => {
      const dataToPass = response?.data;
      // console.log("response.status:", response.status);
      if (response.status === 201) {
        // console.log("dataToPass:", dataToPass);
        dispatch({ type: ADD_TODO, payload: dataToPass });
      }
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status !== 201) {
          const data = error.response.data;
          console.log({ data });
        }
      }
    });
};

export const deleteTodoAction = (id: number) => async (dispatch: AppDispatch) => {
  const URL = `/todos/${id}`;
  await customAxiosInstance
    .delete(URL)
    .then((response) => {
      const dataToPass = response?.data;
      // console.log("response.status:", response.status);
      // console.log("dataToPass:", dataToPass);
      if (response.status === 200) {
        dispatch({ type: DELETE_TODO, payload: dataToPass });
      }
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status !== 200) {
          const data = error.response.data;
          console.log({ data });
        }
      }
    });
};

export const updateTodo =
  (id: number, body: { description: string; privateTodo: boolean }) => async (dispatch: AppDispatch) => {
    const URL = `/todos/${id}`;

    await customAxiosInstance
      .put(URL, body)
      .then((response) => {
        const dataToPass = response?.data;
        // console.log("response.status:", response.status);
        if (response.status === 200) {
          // console.log("dataToPass:", dataToPass);
          dispatch({ type: UPDATE_TODO, payload: dataToPass });
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status !== 201) {
            const data = error.response.data;
            console.log({ data });
          }
        }
      });
  };
