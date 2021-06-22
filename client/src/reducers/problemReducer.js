import {
  CREATE_PROBLEM,
  EDIT_PROBLEM,
  GET_PROBLEM,
  GET_PROBLEMS,
  GET_USER_PROBLEMS,
} from "../actions/types";
import _ from "lodash";

const problemReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROBLEM:
      return { ...state, [action.payload.id]: action.payload };
    case GET_PROBLEM:
      return { ...state, [action.payload.id]: action.payload };
    case GET_PROBLEMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case GET_USER_PROBLEMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case EDIT_PROBLEM:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default problemReducer;
