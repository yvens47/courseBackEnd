const User = require("../models/user.model");
const Course = require("../models/course.model");
const Comment = require("../models/comment.model");
const Chapter = require("../models/chapter.model");
const ObjectId = require("mongoose").Types.ObjectId;

/*
 to display all courses
*/
chapters = async (req, res) => {
  const { courseid } = req.params;
  try {
    const c = Chapter.find({ courseid: courseid }, (error, docs) => {
      res.json(docs);
    });
  } catch (error) {
    res.json(error);
  }
};

/*
 to create new course
*/
// create = async (req, res) => {
//   try {
//     const doc = await Course.create(req.body);

//     // handle error [user can only post one comment]
//     if (doc.code === 11000) {
//       return res.status(400).json({ data: doc, success: true });
//     }

//     res.status(200).json({ data: doc, success: true });
//   } catch (e) {
//     // unable to create and save user

//     res.status(400).json(e).end();
//   }
//   //res.json(req.body);
//   // check user id  or redirected
//   // get  user posted data from the req object
//   // insert data to db
//   // then send jason data back with  object key succes true or false
// };
/*
 to read one course
*/
// read = async (req, res) => {
//   const { id } = req.params;

//   try {
//     Course.findById(id, (error, doc) => {
//       if (error || !doc) {
//         return res.json({
//           message: "Sorry! The Course you are looking for does not exist ",
//           error: true
//         });
//       }
//       res.json(doc);
//     });
//   } catch (error) {
//     res.json(error);
//   }
// };

update = async (req, res) => {};

remove = async (req, res) => {};

module.exports = ChapterConttroller = {
  chapters
  // create,
  // read,
  // update,
  // remove
};
