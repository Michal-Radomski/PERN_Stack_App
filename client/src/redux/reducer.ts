import { combineReducers } from "redux";

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
// import { Action, RootState } from "../Interfaces";

const initialState: RootState = {};

//* Auth
const authReducer = function (state = initialState, action: Action): RootState {
  switch (action.type) {
    case CHECK_AUTH:
      return { ...state, authStatus: action.payload };
    case LOGOUT:
      return { ...state, authStatus: action.payload };
    case LOGIN:
      return { ...state, authStatus: action.payload };
    case REGISTER:
      return { ...state, authStatus: action.payload };
    case CHANGE_MESSAGE:
      return { ...state, authStatus: { ...state.authStatus, ...action.payload } };
    case REFRESH_TOKEN:
      return { ...state, authStatus: action.payload };
    case DELETE_USER:
      return { ...state, authStatus: { ...state.authStatus, ...action.payload } };

    default:
      return state;
  }
};

//* Get Todos
const todosReducer = function (state = initialState, action: Action): RootState {
  switch (action.type) {
    case GET_ALL_TODOS:
      return { ...state, allTodos: action.payload };
    case GET_USER_TODOS:
      return { ...state, userTodos: action.payload };
    case LOGOUT:
      return { ...state, allTodos: {}, userTodos: {} };
    case ADD_TODO:
      return { ...state, userTodos: { ...state.userTodos, ...action.payload } };
    case DELETE_TODO:
      return { ...state, userTodos: { ...state.userTodos, ...action.payload } };
    case UPDATE_TODO:
      return { ...state, userTodos: { ...state.userTodos, ...action.payload } };

    default:
      return state;
  }
};

// CombineReducer
const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
});

export default rootReducer;
