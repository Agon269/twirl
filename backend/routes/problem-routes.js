const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
const problemControllers = require("../controller/problems-controller");
const { check } = require("express-validator");

router.post(
  "/",
  requireAuth,
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("category").not().isEmpty(),
  ],
  problemControllers.createproblem
);

router.put(
  "/edit/:id",
  requireAuth,
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("category").not().isEmpty(),
  ],

  problemControllers.editproblem
);
router.get("/user/:id", problemControllers.userproblems);

router.get("/:id", problemControllers.showproblem);

router.get("/", problemControllers.getproblems);

module.exports = router;
