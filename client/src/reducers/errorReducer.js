import { GET_ERROR, POST_ERROR } from "../actions/types";

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case GET_ERROR:
      return action.payload;
    case POST_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
