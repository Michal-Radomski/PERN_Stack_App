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
      return { ...state, authStatus: action.payload };
    case REFRESH_TOKEN:
      // return { ...state, authStatus: { ...state.authStatus, jwtToken: action.payload } };
      return { ...state, authStatus: action.payload };

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
