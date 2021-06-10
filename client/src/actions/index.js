import twirl from "../api/twirl";
import {
  CREATE_SOLUTION,
  EDIT_SOLUTIONS,
  DELETE_SOLUTION,
  GET_SOLUTION,
  GET_SOLUTIONS,
  CREATE_COMMENT,
} from "./types";
import history from "../history";

export const createSolution = (formValues) => async (dispatch) => {
  const { data } = await twirl.post("/solutions", formValues);
  dispatch({ type: CREATE_SOLUTION, payload: data });

  history.push(`/solution/${data.solutionId}`);
};

export const getSolution = (solutionId) => async (dispatch) => {
  const { data } = await twirl.get(`/solutions/${solutionId}`);

  dispatch({ type: GET_SOLUTION, payload: data });
};

export const createComment = (commentParams) => async (dispatch) => {
  const { data } = await twirl.put(
    `/solutions/comment/${commentParams.solutionId}`,
    commentParams
  );
  dispatch({ type: CREATE_COMMENT, payload: data });
};

export const getSolutions = () => async (dispatch) => {
  const res = await twirl.get("/solutions");
  console.log(res.data);
  dispatch({ type: GET_SOLUTIONS, payload: res.data });
};

export const editSolution = (solutionId, formValues) => async (dispatch) => {
  const res = await twirl.put(`/solutions/edit/${solutionId}`, formValues);
  dispatch({ type: EDIT_SOLUTIONS, payload: res.data });
  history.push(`/solution/${res.data.id}`);
};

export const deleteSolution = (solutionId) => async (dispatch) => {
  const res = await twirl.delete(`/solutions/${solutionId}`);
  dispatch({ type: DELETE_SOLUTION, payload: res.data });
};
