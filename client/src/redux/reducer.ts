import { combineReducers } from "redux";
import { CHECK_AUTH } from "./actionTypes";

// import { Action, RootState } from "../Interfaces";

const initialState: RootState = {};

const appReducer = function (state = initialState, action: Action): RootState {
  switch (action.type) {
    case CHECK_AUTH:
      return { ...state, authStatus: action.payload };

    default:
      return state;
  }
};

// CombineReducer
const rootReducer = combineReducers({
  appState: appReducer,
});

export default rootReducer;
