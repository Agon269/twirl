const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controller/user-controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post(
  "/signup",
  [
    check("userName").not().isEmpty(),
    check("password").not().isEmpty().isLength({ min: 6 }),
  ],
  userControllers.signup
);
router.post(
  "/signin",
  [
    check("userName").not().isEmpty(),
    check("password").not().isEmpty().isLength({ min: 6 }),
  ],
  userControllers.signin
);

router.get("/currentuser", auth, userControllers.currentuser);

router.get("/:id", userControllers.getuser);

module.exports = router;
