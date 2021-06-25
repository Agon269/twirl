const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const HttpError = require("../models/error");
const { avatars } = require("../models/avatars");
const signJwt = (id, userName, avatar) => {
  return jwt.sign({ id, userName, avatar }, process.env.JWT_KEY);
};

const sendToken = (user, statusCode, req, res) => {
  const token = signJwt(user.id, user.userName, user.avatar);
  const options = {
    secure: false,
    httpOnly: false,
  };
  res.cookie("jwt", token, options);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs", 422);
    return next(error);
  }

  const { userName, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ userName: userName });
  } catch (err) {
    const error = new HttpError(
      "something went wrong couldnt sign you up",
      500
    );
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError("Invalid credential", 422);
    return next(error);
  }

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);

  let newUser = new User({
    userName,
    password: newPassword,
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
    banner:
      "https://res.cloudinary.com/dvfihlcxd/image/upload/v1623527245/79731568097599.5b50bca477735_gqynry.jpg",
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
  }

  sendToken(newUser, 200, req, res);
};
//======================================================SIGNIN==============================================
const signin = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid credential", 422);
    return next(error);
  }

  const { userName, password } = req.body;

  try {
    existingUser = await User.findOne({ userName: userName });
  } catch (err) {
    const error = new HttpError("something went wrong couldnt log you in", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("invalid credentials", 401);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("couldnt ", 500);
    return next(error);
  }
  if (!isValidPassword) {
    const error = new HttpError("invalid credentials", 401);
    return next(error);
  }

  sendToken(existingUser, 200, req, res);
};

//============================================== SIGNOUT =================================
const signout = async (req, res, next) => {
  const options = {
    expires: new Date(Date.now() + 10000),
    secure: false,
    httpOnly: false,
  };
  res.clearCookie("jwt");

  res.status(200).json({ status: "success" });
};

exports.secretContent = (req, res) => {
  res.status(200).json({ status: "SECRET CONTENT SHOWN!!!" });
};

//============================================= CURRENT USER =============================
const currentuser = async (req, res, next) => {
  res.send({ currentUser: req.user || null });
};

//================================ Get ONE USER =====================
const getuser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById({ _id: req.params.id });
  } catch (err) {
    const error = new HttpError("Couldn't find user", 400);
    return next(error);
  }
  res.send(user);
};
exports.signup = signup;
exports.signin = signin;
exports.signout = signout;
exports.currentuser = currentuser;
exports.getuser = getuser;
