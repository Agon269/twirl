const { validationResult } = require("express-validator");
const HttpError = require("../models/error");
const Solution = require("../models/solution");
const User = require("../models/user");

const createsolution = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs", 422);
    return next(error);
  }
  const { title, description, video } = req.body;
  const { id } = req.user;

  const solution = new Solution({
    title,
    description,
    video,
    userId: id,
    comments: [],
  });

  try {
    solution.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }
  let user;
  try {
    user = await User.findOne({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }

  user.solutions.push(solution.id);
  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }

  res.status(201).json({ solutionId: solution.id });
};

const showsolution = async (req, res, next) => {
  let solution;
  try {
    solution = await Solution.findOne({ _id: req.params.id });
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }
  let user;
  try {
    user = await User.findOne({ _id: solution.userId });
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }

  let sol = {
    title: solution.title,
    description: solution.description,
    video: solution.video,
    comments: solution.comments,
    createrName: user.userName,
    createrId: user._id,
    id: solution._id,
    avatar: user.avatar,
  };

  res.send(sol);
};

const createcomment = async (req, res, next) => {
  const { userId, comment } = req.body;
  let solution;
  try {
    solution = await Solution.findOne({ _id: req.params.id });
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
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
  let user;
  try {
    user = await User.findOne({ _id: solution.userId });
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }
  try {
    await solution.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }

  let sol = {
    title: solution.title,
    description: solution.description,
    video: solution.video,
    comments: solution.comments,
    createrName: user.userName,
    createrId: user._id,
    id: solution._id,
    avatar: user.avatar,
  };

  res.send(sol);
};

const editsolution = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs", 422);
    return next(error);
  }
  let solution;
  try {
    solution = await Solution.findOne({ _id: req.params.id });
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }

  if (solution.userId !== req.user.id) {
    const error = new HttpError("Unauthorized", 403);
    return next(error);
  }

  solution.set({
    title: req.body.title,
    description: req.body.description,
  });

  await solution.save();

  let user;
  try {
    user = await User.findOne({ _id: req.user.id });
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }
  let sol = {
    title: solution.title,
    description: solution.description,
    video: solution.video,
    comments: solution.comments,
    createrName: user.userName,
    createrId: user._id,
    id: solution._id,
    avatar: user.avatar,
  };

  res.send(sol);
};

const getsolutions = async (req, res, next) => {
  let solutions;
  try {
    solutions = await Solution.find({});
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }

  res.send(solutions);
};

exports.createsolution = createsolution;
exports.showsolution = showsolution;
exports.createcomment = createcomment;
exports.editsolution = editsolution;
exports.getsolutions = getsolutions;
