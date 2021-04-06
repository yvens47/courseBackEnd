// const User = require("../models/user.model");

const Comment = require("../models/comment.model");
const ObjectId = require("mongoose").Types.ObjectId;

/*
 to display all courses
*/
comments = async (req, res) => {
  try {
    const c = Comment.find({}, (error, docs) => {
      res.json({ docs });
    });
  } catch (error) {
    res.json(error);
  }
};

/*
 to create new course
  user is not allowed to post their onwn course->vieo sections
  can only reply  comments.
*/
create = async (req, res) => {
  try {
    const doc = await Comment.create(req.body);

    //res.status(200).json({ comment: doc, success: true, body: req.body });
  } catch (e) {
    console.log(e.message);
    // unable to create and save user
    res.status(400).json(e).end();
  }
  //res.json(req.body);
  // check user id  or redirected
  // get  user posted data from the req object
  // insert data to db
  // then send jason data back with  object key succes true or false
};
/*
 to read one course
*/
read = async (req, res) => {
  const { id } = req.params;

  try {
    Comment.find({ sectionid: new ObjectId(id) }, (error, doc) => {
      if (error || !doc) {
        return res.json({
          message: "Sorry! The comment soea not xist ",
          error: true
        });
      }
      res.json(doc);
    });
  } catch (error) {
    res.json(error);
  }
};

create = async (req, res) => {
  const { id, sectionid } = req.params;

  try {
    const doc = await Comment.create(req.body);
    res.status(200).json({ data: doc, success: true });
  } catch (e) {
    // unable to create and save user
    res.json(e).end();
  }
};

/*
 to update course
*/
const update = async (req, res) => {};

const remove = async (req, res) => {};

module.exports = CommentController = {
  comments,
  create,
  read,
  update,
  remove
};
