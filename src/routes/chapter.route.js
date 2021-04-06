var express = require("express");
var router = express.Router();
// controllers
const ChapterController = require("../controllers/chapter.controller");

// define the home page route
router.get("/:courseid", ChapterController.chapters);
// router.get("/:id", ChapterController.read);
// router.post("/create", ChapterController.create);

module.exports = router;
