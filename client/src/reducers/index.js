import { combineReducers } from "redux";
import solutionReducer from "./solutionReducer";
export default combineReducers({
  solutions: solutionReducer,
});
