const jwt = require("jsonwebtoken");

const currentUser = (req, res, next) => {
  if (req.headers.user === "undefined") {
    return next();
  } else if (req.headers.user !== "undefined") {
    try {
      const payload = jwt.verify(req.headers.user, process.env.JWT_KEY);
      if (payload === "expiredtoken") {
        next();
      }
      req.user = payload;
    } catch (err) {
      console.log(err);
    }
  }

  next();
};
module.exports = currentUser;
