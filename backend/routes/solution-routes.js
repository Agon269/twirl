const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
const solutionControllers = require("../controller/solutions-controller");
const { check } = require("express-validator");

router.post(
  "/:id",
  requireAuth,
  [check("description").not().isEmpty(), check("video").not().isEmpty()],
  solutionControllers.createsol
);
router.get("/:id", solutionControllers.showsolution);

router.get("/", solutionControllers.getsolutions);

router.post("/comment/:id", requireAuth, solutionControllers.createcomment);

router.put(
  "/edit/:id",
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  requireAuth,
  solutionControllers.editsolution
);

router.delete("/:id", requireAuth, solutionControllers.deletesolution);

router.get("/user/:id", solutionControllers.usersolutions);

module.exports = router;
