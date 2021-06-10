import {
  CREATE_SOLUTION,
  GET_SOLUTION,
  CREATE_COMMENT,
  GET_SOLUTIONS,
} from "../actions/types";
import _ from "lodash";

const solutionReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SOLUTION:
      return { ...state, [action.payload.id]: action.payload };
    case GET_SOLUTION:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    case GET_SOLUTIONS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};

export default solutionReducer;
