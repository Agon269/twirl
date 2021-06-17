import { GET_USER } from "../actions/types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
