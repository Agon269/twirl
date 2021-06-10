const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
const solutionControllers = require("../controller/solutions-controller");
const { check } = require("express-validator");

router.post(
  "/",
  requireAuth,
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  solutionControllers.createsolution
);

router.get("/:id", solutionControllers.showsolution);
router.get("/", solutionControllers.getsolutions);

router.put("/comment/:id", requireAuth, solutionControllers.createcomment);

router.put(
  "/edit/:id",
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  requireAuth,
  solutionControllers.editsolution
);
module.exports = router;
