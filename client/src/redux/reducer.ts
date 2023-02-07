import { combineReducers } from "redux";

import { CHECK_AUTH, LOGIN, LOGOUT, REGISTER, CHANGE_MESSAGE } from "./actionTypes";
// import { Action, RootState } from "../Interfaces";

const initialState: RootState = {};

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

    default:
      return state;
  }
};

const todosReducer = function (state = initialState, action: Action): RootState {
  switch (action.type) {
    case CHECK_AUTH:
      return { ...state, authStatus: action.payload };

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
