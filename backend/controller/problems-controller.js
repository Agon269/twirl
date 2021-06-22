const { validationResult } = require("express-validator");
const HttpError = require("../models/error");
const Solution = require("../models/solution");
const User = require("../models/user");
const Problem = require("../models/problem");

const createproblem = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs", 422);
    return next(error);
  }

  const { title, description, category } = req.body;
  const { id } = req.user;

  let user;
  try {
    user = await User.findOne({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "Sorry something went wrong couldn't access the database",
      500
    );
    return next(error);
  }

  const problem = new Problem({
    title,
    description,
    category,
  });
  problem.user = user;

  try {
    problem.save();
  } catch (err) {
    const error = new HttpError(
      "Sorry something went wrong couldn't access the database",
      500
    );
    return next(error);
  }

  res.send(problem);
};

const editproblem = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs", 422);
    return next(error);
  }

  let problem;

  try {
    problem = await Problem.findById({ _id: req.params.id }).populate("user");
  } catch (err) {
    const error = new HttpError(
      "Sorry something went wrong couldnt edit the problem",
      500
    );
    console.log(err);
    return next(error);
  }

  if (problem.user.id !== req.user.id) {
    const error = new HttpError("Unauthorized", 403);
    return next(error);
  }

  problem.set({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
  });
  await problem.save();

  res.send(problem);
};

const showproblem = async (req, res, next) => {
  let problem;
  try {
    problem = await Problem.findById({ _id: req.params.id }).populate("user");
  } catch (err) {
    const error = new HttpError("Couldn't find problem", 400);
    return next(error);
  }

  res.send(problem);
};
const getproblems = async (req, res, next) => {
  let problems;
  try {
    problems = await Problem.find().populate("user");
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }
  res.send(problems);
};

const userproblems = async (req, res, next) => {
  let problems;
  try {
    problems = await Problem.find({ user: req.params.id }).populate("user");
  } catch (err) {
    console.log(err);
    const error = new HttpError("Sorry something went wrong.", 500);
    return next(error);
  }

  res.send(problems);
};

exports.createproblem = createproblem;
exports.editproblem = editproblem;
exports.showproblem = showproblem;
exports.getproblems = getproblems;
exports.userproblems = userproblems;
