const { validationResult } = require("express-validator");
const HttpError = require("../models/error");
const Solution = require("../models/solution");
const User = require("../models/user");

//============================================== CREATE SOLUTION ===================================
const createsolution = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs", 422);
    return next(error);
  }

  const { title, description, video } = req.body;
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

  const solution = new Solution({
    title,
    description,
    video,
    comments: [],
  });
  solution.user = user;

  try {
    solution.save();
  } catch (err) {
    const error = new HttpError(
      "Sorry something went wrong couldn't access the database",
      500
    );
    return next(error);
  }

  res.send(solution);
};
//========================================GET ONE SOLUTION =======================================
const showsolution = async (req, res, next) => {
  let solution;
  try {
    solution = await Solution.findById({ _id: req.params.id }).populate("user");
  } catch (err) {
    const error = new HttpError("Couldn't find solution", 400);
    return next(error);
  }

  res.send(solution);
};
//==============================================CREATE COMMENT ========================================
const createcomment = async (req, res, next) => {
  const { userId, comment } = req.body;
  let solution;
  try {
    solution = await Solution.findById({ _id: req.params.id }).populate("user");
  } catch (err) {
    const error = new HttpError(
      "Sorry something went wrong couldnt access the database",
      500
    );
    return next(error);
  }

  let commentor;
  try {
    commentor = await User.findOne({ _id: userId });
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }
  solution.comments.push({
    userId,
    userName: commentor.userName,
    userAvatar: commentor.avatar,
    comment,
  });

  try {
    await solution.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }

  res.send(solution);
};
//================================================== EDIT SOLUTION ========================
const editsolution = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs", 422);
    return next(error);
  }

  let solution;
  try {
    solution = await Solution.findById({ _id: req.params.id }).populate("user");
  } catch (err) {
    const error = new HttpError(
      "Sorry something went wrong couldnt edit the solution",
      500
    );
    return next(error);
  }

  if (solution.user.id !== req.user.id) {
    const error = new HttpError("Unauthorized", 403);
    return next(error);
  }

  solution.set({
    title: req.body.title,
    description: req.body.description,
  });

  await solution.save();

  res.send(solution);
};
//==================================== GET ALL SOLUTIONS ===========================
const getsolutions = async (req, res, next) => {
  let solutions;
  try {
    solutions = await Solution.find().populate("user");
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }

  res.send(solutions);
};

//================================ DELETE SOLUTION =================================
const deletesolution = async (req, res, next) => {
  let solution;
  try {
    solution = await Solution.findById({ _id: req.params.id }).populate("user");
  } catch (err) {
    const error = new HttpError("Sorry something went wrong.", 500);
    return next(error);
  }

  if (solution.user.id !== req.user.id) {
    const error = new HttpError("Unauthorized", 403);
    return next(error);
  }

  try {
    await Solution.deleteOne({ _id: solution.id });
  } catch (err) {
    const error = new HttpError(
      "Sorry something went wrong couldn't delete the solution.",
      500
    );
    return next(error);
  }

  res.send({ message: "Successfully deleted" });
};

//=================================== GET USERS SOLUTIONS ============================
const usersolutions = async (req, res, next) => {
  let solutions;
  try {
    solutions = await Solution.find({ user: req.params.id }).populate("user");
  } catch (err) {
    const error = new HttpError("Sorry something went wrong.", 500);
    return next(error);
  }

  res.send(solutions);
};

exports.createsolution = createsolution;
exports.showsolution = showsolution;
exports.createcomment = createcomment;
exports.editsolution = editsolution;
exports.getsolutions = getsolutions;
exports.deletesolution = deletesolution;
exports.usersolutions = usersolutions;
