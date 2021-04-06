var express = require("express");
var router = express.Router();
// controllers
const UserController = require("../controllers/user.controller");

// define the home page route
router.post("/login", UserController.login);
//router.get("/:id", UserController.read);
router.post("/register", UserController.signup);
router.get("/logout", UserController.logout);
router.post("/forget-password", UserController.forgotPassword);

router.get("/:id/courses/", UserController.courses);
router.put("/:id/update", UserController.update);
router.post("/:id/add-subscribe/:courseid", UserController.subscribeToCourse);
router.post(
  "/:id/remove-subscribe/:courseid",
  UserController.removeUserCourseSubscribedCourse
); // should be delete

module.exports = router;
