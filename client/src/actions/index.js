import twirl from "../api/twirl";
import {
  EDIT_SOLUTION,
  DELETE_SOLUTION,
  GET_SOLUTION,
  GET_SOLUTIONS,
  CREATE_COMMENT,
  GET_USER_SOLUTION,
  GET_USER,
  GET_ERROR,
  POST_ERROR,
  CREATE_PROBLEM,
  GET_PROBLEM,
  GET_PROBLEMS,
  EDIT_PROBLEM,
  CREATE_SOLUTION_PROBLEM,
  GET_USER_PROBLEMS,
  GET_PROBLEM_SOLUTIONS,
} from "./types";
import history from "../history";
import axios from "axios";

// let localApi = "http://localhost:5000/api";
// let deplApi = "https://frozen-taiga-24724.herokuapp.com/api";
const BASE_URL = "https://frozen-taiga-24724.herokuapp.com/api";

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

export const createComment = (commentParams, token) => async (dispatch) => {
  let res;
  try {
    res = await axios({
      method: "post",
      url: `${BASE_URL}/solutions/comment/${commentParams.solutionId}`,
      data: { ...commentParams },
      headers: { user: token },
    });
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
    res = await twirl.get(`/solutions/user/${id}`);
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

export const editSolution =
  (solutionId, formValues, token) => async (dispatch) => {
    let res;
    try {
      res = await axios({
        method: "put",
        url: `${BASE_URL}/solutions/edit/${solutionId}`,
        data: { ...formValues },
        headers: { user: token },
      });
      dispatch({ type: EDIT_SOLUTION, payload: res.data });
      history.push(`/solution/${res.data.id}`);
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err });
    }
  };

export const deleteSolution = (solutionId, token) => async (dispatch) => {
  try {
    await axios({
      method: "delete",
      url: `${BASE_URL}/solutions/${solutionId}`,

      headers: { user: token },
    });
    dispatch({ type: DELETE_SOLUTION, payload: solutionId });
    history.push("/");
  } catch (err) {
    console.log("failed");
    dispatch({ type: POST_ERROR, payload: err });
  }
};

//============================= PROBLEMS ===================================

export const createProblem = (formValues, token) => async (dispatch) => {
  try {
    const res = await axios({
      method: "post",
      url: `${BASE_URL}/problems`,
      data: { ...formValues },
      headers: { user: token },
    });
    dispatch({ type: CREATE_PROBLEM, payload: res.data });
    history.push(`/problem/${res.data.id}`);
  } catch (err) {
    console.log("failed");
    dispatch({ type: POST_ERROR, payload: err });
  }
};

export const getProblem = (solutionId) => async (dispatch) => {
  try {
    const res = await twirl.get(`/problems/${solutionId}`);
    dispatch({ type: GET_PROBLEM, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: err });
  }
};

export const getProblems = () => async (dispatch) => {
  let res;
  try {
    res = await twirl.get("/problems");
    dispatch({ type: GET_PROBLEMS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: err });
  }
};

export const editProblem =
  (problemId, formValues, token) => async (dispatch) => {
    let res;
    try {
      res = await axios({
        method: "put",
        url: `${BASE_URL}/problems/edit/${problemId}`,
        data: { ...formValues },
        headers: { user: token },
      });
      dispatch({ type: EDIT_PROBLEM, payload: res.data });
      history.push(`/problem/${res.data.id}`);
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err });
    }
  };

export const createSolutionProblem =
  (formValues, problemId, token) => async (dispatch) => {
    try {
      const res = await axios({
        method: "post",
        url: `${BASE_URL}/solutions/${problemId}`,
        data: { ...formValues },
        headers: { user: token },
      });
      dispatch({ type: CREATE_SOLUTION_PROBLEM, payload: res.data });
      history.push(`/solution/${res.data.id}`);
    } catch (err) {
      console.log("failed");
      dispatch({ type: POST_ERROR, payload: err });
    }
  };

export const getUserProblems = (userId) => async (dispatch) => {
  try {
    const res = await twirl.get(`/problems/user/${userId}`);

    dispatch({ type: GET_USER_PROBLEMS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: err });
  }
};

export const getProblemSolution = (id) => async (dispatch) => {
  let res;
  try {
    res = await twirl.get(`/solutions/problem/${id}`);

    dispatch({ type: GET_PROBLEM_SOLUTIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: err });
  }
};
