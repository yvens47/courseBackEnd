var express = require("express");
var router = express.Router();
// controllers
const CommentController = require("../controllers/comment.controller");

// define the home page route
router.get("/", CommentController.comments);
router.get("/:id", CommentController.read);
router.post("/create", CommentController.create);

module.exports = router;
