import twirl from "../api/twirl";
import {
  CREATE_SOLUTION,
  EDIT_SOLUTIONS,
  DELETE_SOLUTION,
  GET_SOLUTION,
  GET_SOLUTIONS,
  CREATE_COMMENT,
  GET_USER_SOLUTION,
  GET_USER,
  GET_ERROR,
  POST_ERROR,
} from "./types";
import history from "../history";

export const createSolution = (formValues) => async (dispatch) => {
  let res;
  try {
    res = await twirl.post("/solutions", formValues);
    dispatch({ type: CREATE_SOLUTION, payload: res.data });
    history.push(`/solution/${res.data.id}`);
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err });
  }
};

export const getSolution = (solutionId) => async (dispatch) => {
  let res;
  try {
    res = await twirl.get(`/solutions/${solutionId}`);
    if (res.data === "") {
      dispatch({ type: GET_ERROR, payload: "Solution does not exist" });
      return;
    }
    dispatch({ type: GET_SOLUTION, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: "Solution does not exist" });
  }
};

export const createComment = (commentParams) => async (dispatch) => {
  let res;
  try {
    res = await twirl.post(
      `/solutions/comment/${commentParams.solutionId}`,
      commentParams
    );
    dispatch({ type: CREATE_COMMENT, payload: res.data });
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err });
  }
};

export const getSolutions = () => async (dispatch) => {
  let res;
  try {
    res = await twirl.get("/solutions");
    dispatch({ type: GET_SOLUTIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: err });
  }
};

export const getUsersSolutions = (id) => async (dispatch) => {
  let res;
  try {
    res = await twirl.get(`solutions/user/${id}`);
    dispatch({ type: GET_USER_SOLUTION, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: err });
  }
};

export const getUser = (id) => async (dispatch) => {
  let res;
  try {
    res = await twirl.get(`/user/${id}`);
    dispatch({ type: GET_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: err });
  }
};

export const editSolution = (solutionId, formValues) => async (dispatch) => {
  let res;
  try {
    res = await twirl.put(`/solutions/edit/${solutionId}`, formValues);
    dispatch({ type: EDIT_SOLUTIONS, payload: res.data });
    history.push(`/solution/${res.data.id}`);
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err });
  }
};

export const deleteSolution = (solutionId) => async (dispatch) => {
  try {
    await twirl.delete(`/solutions/${solutionId}`);
    dispatch({ type: DELETE_SOLUTION, payload: solutionId });
    history.push("/");
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err });
  }
};
