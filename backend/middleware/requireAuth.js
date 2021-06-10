const jwt = require("jsonwebtoken");
const HttpError = require("../models/error");

const requireAuth = (req, res, next) => {
  if (req.headers.hasOwnProperty("user") === false) {
    const error = new HttpError("invalid credentials", 401);
    return next(error);
  } else if (req.headers.user !== "undefined") {
    try {
      const payload = jwt.verify(req.headers.user, process.env.JWT_KEY);
      req.user = payload;
    } catch (err) {
      console.log(err);
    }
    next();
  }
};
module.exports = requireAuth;
