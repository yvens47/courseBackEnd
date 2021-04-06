var express = require("express");
var router = express.Router();
// controllers
const CourseController = require("../controllers/course.controller");

// define the home page route
router.get("/", CourseController.courses);
router.get("/:id", CourseController.read);
router.post("/create", CourseController.create);

module.exports = router;
