import { combineReducers } from "redux";
import solutionReducer from "./solutionReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
export default combineReducers({
  solutions: solutionReducer,
  user: userReducer,
  error: errorReducer,
});
