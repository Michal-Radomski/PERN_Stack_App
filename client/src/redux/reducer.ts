import { combineReducers } from "redux";

// import { Action, RootState } from "../Interfaces";

const initialState: RootState = {};

const appReducer = function (state = initialState, action: Action): RootState {
  return state;
};

// CombineReducer
const rootReducer = combineReducers({
  appState: appReducer,
});

export default rootReducer;
