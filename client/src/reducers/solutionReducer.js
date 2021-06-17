import {
  CREATE_SOLUTION,
  GET_SOLUTION,
  CREATE_COMMENT,
  GET_SOLUTIONS,
  DELETE_SOLUTION,
  GET_USER_SOLUTION,
} from "../actions/types";
import _ from "lodash";

const solutionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SOLUTIONS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case CREATE_SOLUTION:
      return state;
    case GET_SOLUTION:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    case GET_USER_SOLUTION:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case DELETE_SOLUTION:
      return _.omit(state, action.payload);

    default:
      return state;
  }
};

export default solutionReducer;
